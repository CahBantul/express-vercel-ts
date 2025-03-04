import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";

const SECRET_KEY = "your_secret_key"; // Gantilah dengan secret key yang lebih aman

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if( error instanceof Error){
        res.status(500).json({ message: error.message });
    }else{
        res.status(500).json({ message: "Server error", error });
    }
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Cek user
    const user = await UserModel.findOne({ email });
    if (!user) {
       res.status(400).json({ message: "Invalid credentials" });
    }else{
        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
           res.status(400).json({ message: "Invalid credentials" });
        }
    
        // Generate token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
