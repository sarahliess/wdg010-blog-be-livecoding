const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  createMultipleStudents,
} = require("../controllers/students");

const auth = require("../middlewares/auth");

router.route("/students").get(auth, getAllStudents).post(auth, createStudent);

router.route("/students/bulk").post(createMultipleStudents);

router
  .route("/students/:id")
  .get(getSingleStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
