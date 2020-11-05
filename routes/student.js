const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const {
  getStudentById,
  createStudent,
  getAllStudents,
  deleteStudent,
  getStudent,
  getStudentByName,
  getStudentDataByName,
  updateStudent,
} = require("../controllers/student");

const { getUserById } = require("../controllers/user");

//PARAMS
router.param("userId", getUserById);
router.param("studentId", getStudentById);
// router.param("studentName", getStudentByName);

//Creating Student
router.post(
  "/createstudent/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createStudent
);

router.get(
  "/student/:studentId/:userId",
  isSignedIn,
  isAuthenticated,
  getStudent
);

router.get(
  "student/name/:userId",
  isSignedIn,
  isAuthenticated,
  getStudentDataByName
);

router.get("/students/:userId", isSignedIn, isAuthenticated, getAllStudents);

router.delete(
  "/deletestudent/:studentId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteStudent
);

router.put(
  "/updatestudent/:studentId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStudent
);

module.exports = router;
