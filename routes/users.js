const express = require("express");
const router = express.Router();

const { getAllUsers, signUp, login } = require("../controllers/users");
const auth = require("../middlewares/auth")

router.route("/auth/users").get(auth, getAllUsers);

router.route("/auth/signup").post(signUp);

router.route("/auth/login").post(login);

module.exports = router;
