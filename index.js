require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const studentsRouter = require("./routes/students");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 8080;

db();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routing middleware:
app.use("/", studentsRouter, usersRouter);

app.get("/", (req, res) => {
  res.send("WDG#010 Blog API");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
