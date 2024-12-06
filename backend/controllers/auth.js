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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    return res.status(201).json({
      status: "OK",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
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

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 3600000,
  });

  return res.status(200).json({
    status: "OK",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Yetkisiz erişim!" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await Auth.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" + error });
  }
};

const signOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Çıkış yapıldı" });
};

module.exports = { register, login, getUser, signOut };
