import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    const findByEmail = await User.findOne({ email });

    if (findByEmail) {
      return res.status(400).json({ message: "Email Already Exist !" });
    }

    const findByUserName = await User.findOne({ userName });

    if (findByUserName) {
      return res.status(400).json({ message: "Username Already Exist !" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    // storing the token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Signup Error : ${error.message}` });
  }
};

export const signIn = async (req, res) => {
  try {
    const { password, userName } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "InCorrect Password!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SignIn Error : ${error.message}` });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Signout Successfully !" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Signout Error : ${error.message}` });
  }
};
