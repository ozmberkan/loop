const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://loop-be.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Hem polling hem websocket
});


app.set("io", io);

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://loop-tan.vercel.app",
      "https://www.loop-tan.vercel.app",
      "https://loop-be.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Server is Running `);
});

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı:", socket.id);

  socket.on("likePost", (data) => {
    console.log("Like event received:", data);
    io.emit("likeUpdated", data);
  });

  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı:", socket.id);
  });
});

connectDB()
  .then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error: ", error);
  });
