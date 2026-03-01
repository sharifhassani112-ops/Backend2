import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotevn from "dotenv";
import bcrypt from "bcrypt";

dotevn.config();

export async function signupControler(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).send({ message: "All feild are required!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "password must be atleast 6 Charachter" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Email is Invalid!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email Already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passoword, salt);
    const newUser = await User.create({
      fullName,
      email,
      password,
      hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 100, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
    });
    res.status(201).send({ message: "User Registered Successfully!", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server error" });
  }
}
export async function login(req, res) {
  try {
    const { email, passoword } = req.body;
    if (!email || !passoword) {
      res.status(201).send({ message: "Email and password are Required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({ message: "Invalid Credential" });
    }
    const isPasswordInvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordInvalid) {
      res.status(400).send({ message: "Invalid Credential" });
    }
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      maxAge: 7 * 24 * 60 * 60 * 100, // 7 days
    });
    const { password: _, ...userWithoutPassword } = user._doc;
    res
      .status(200)
      .send({ message: "Login Successful!", user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: proccess.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.status(200).send({ message: "logout Successful!" });
}
