const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("./validation/registerValidation");

// @route GET api/auth/test
// @desc Test auth route
// @access Public
router.get("/test", (req, res) => {
  res.send("Auth route");
});

// @route POST api/auth/register
// @desc Create a new user
// @access Public
router.post("/register", async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Check if user already exists
    const existingEmail = await User.findOne({
      email: new RegExp(`^${req.body.email}$`, "i"),
    });

    if (existingEmail) {
      return res.status(400).json({ error: "User exists with this email" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // create a new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    // save user to database
    const savedUser = await newUser.save();

    const userToReturn = { ...savedUser._doc };
    delete userToReturn.password;

    // return the new user
    return res.json(userToReturn);
  } catch {
    // error here
    console.log(err);

    res.status(500).send(err.message);
  }
});

// @route POST api/auth/login
// @desc Login user and return a access token
// @access Public
router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({
      email: new RegExp(`^${req.body.email}$`, "i"),
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "There was a problem with your login credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "There was a problem with your login credentials" });
    }

    return res.json({ passwordMatch });
  } catch {
    // error here
    console.log(err);

    res.status(500).send(err.message);
  }
});

module.exports = router;
