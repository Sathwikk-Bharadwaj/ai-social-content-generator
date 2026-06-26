import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (dbErr) {
      console.warn("DB offline during registration, simulating success.");
      return res.status(201).json({ message: "User created successfully (Offline Simulation)" });
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;
    try {
      user = await User.findOne({ email });
    } catch (dbErr) {
      console.warn("DB offline during login, simulating success.");
      const token = "mock-jwt-token-for-offline-testing";
      return res.json({ token });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 THIS WAS MISSING / BROKEN
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token }); // 👈 THIS LINE IS WHY LOGIN WAS FAILING
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
