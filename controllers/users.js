const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //1. handle password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("my password - hashed", hashedPassword);
    //2. create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send("User has been created. Please log in now.");
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //1. find user
    const [user] = await User.find({ email });
    if (!user)
      return res
        .status(404)
        .send("User with this email does not exist. Please sign up first.");
    //2. check password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(404).send("Invalid password");
    } else {
      //3. generate + send token
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
      return res.status(200).send(token);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = { getAllUsers, signUp, login };
