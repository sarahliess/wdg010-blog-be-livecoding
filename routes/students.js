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

router.route("/students").get(getAllStudents).post(createStudent);

router.route("/students/bulk").post(createMultipleStudents);

router
  .route("/students/:id")
  .get(getSingleStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
