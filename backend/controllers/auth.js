const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Auth = require("../models/auth.js");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;

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
      displayName,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 36000000,
    });

    return res.status(201).json({
      status: "OK",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        displayName: newUser.displayName,
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
    maxAge: 36000000,
  });

  return res.status(200).json({
    status: "OK",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      premium: user.premium,
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Bu e-posta adresi kayıtlı değil." });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const payload = { id: user._id, email: user.email };
    const resetToken = jwt.sign(payload, secret, { expiresIn: "1h" });

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&id=${user._id}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "info@loop.com",
      to: email,
      subject: "Şifre Sıfırlama Talebi",
      text: `Şifrenizi sıfırlamak için bu bağlantıya tıklayın: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Şifre sıfırlama bağlantısı gönderildi." });
  } catch (error) {
    console.error("Hata Detayı:", error);
    res.status(500).json({ message: "Sunucu Hatası: " + error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, id, newPassword } = req.body;

  try {
    const user = await Auth.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    const secret = process.env.JWT_SECRET + user.password;
    jwt.verify(token, secret);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Şifre başarıyla güncellendi." });
  } catch (error) {
    console.error("Hata Detayı:", error);
    res.status(400).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await Auth.findOne({ username: req.params.username }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Sunucu Hatası: " + error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || !id) {
      return res.status(400).json({ message: "Eksik veri gönderildi." });
    }

    const user = await Auth.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası: " + error.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  signOut,
  forgotPassword,
  resetPassword,
  getUserByUsername,
  updateUser,
};
