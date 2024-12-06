const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Auth = require("../models/auth.js");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Auth.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      if (user.username === username) {
        return res
          .status(400)
          .json({ message: "Bu kullanıcı adı daha önce alınmış." });
      }
      if (user.email === email) {
        return res
          .status(400)
          .json({ message: "Bu e-posta adresi daha önce alınmış." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      status: "OK",
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" + error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Böyle bir kullanıcı mevcut değil!" });
  }

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    return res.status(400).json({
      message: "Lütfen parolanızı kontrol ediniz!",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    status: "OK",
    user,
    token,
  });
};

module.exports = { register, login };
