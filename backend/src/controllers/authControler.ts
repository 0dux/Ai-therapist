import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Session from "../models/sessions";
import User from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password all fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

    // const token = jwt.sign(
    //   { id: newUser._id },
    //   process.env.JWT_SECRET || "default_secret_key",
    //   {
    //     expiresIn: "7d",
    //   }
    // );

    // const session = new Session({ userId: newUser._id, token });
    // await session.save();

    // return res
    //   .status(201)
    //   .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "default_secret_key",
      {
        expiresIn: "7d",
      }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Token expires in 7 days
    const session = new Session({
      userId: user._id,
      token,
      expiresAt,
      deviceInfo: req.headers["user-agent"],
    });
    await session.save();

    return res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token is required for logout." });
    }

    await Session.deleteOne({ token });
    return res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
