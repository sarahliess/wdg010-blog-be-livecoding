const express = require("express");
const router = express.Router();

const { getAllUsers, signUp, login } = require("../controllers/users");

router.route("/auth/users").get(getAllUsers);

router.route("/auth/signup").post(signUp);

router.route("/auth/login").post(login);

module.exports = router;
