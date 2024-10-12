const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

router.post("/checkUser", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await UserModel.findOne({ userId });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: "Login failed", user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/register", async (req, res) => {
  const { userId } = req.body;
  try {
    const existingUser = await UserModel.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newuser = new UserModel({ ...req.body, verified: false });
    await newuser.save();
    res.send("User Registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
