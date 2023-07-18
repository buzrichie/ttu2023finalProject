const express = require("express");
const router = express.Router();
const {
  getAllTeacher,
  login,
  createTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controller/teacherControllers");
const {
  authenticateRoute,
  hasRole,
  isOwner,
} = require("../middleware/authenticateRoute");
const {
  restrictUpdateFieldsMiddleware,
} = require("../middleware/restrictUpdateFields");

//Routes for various Teachers
router.post("/login", login);
router.use(authenticateRoute);
router.get("/", hasRole("admin"), getAllTeacher);
router.post("/", hasRole("admin"), createTeacher);
router.get("/:id", getSingleTeacher);
router.put(
  "/:id",
  isOwner || hasRole("admin"),
  restrictUpdateFieldsMiddleware,
  updateTeacher
);
router.delete("/:id", hasRole("admin"), deleteTeacher);

module.exports = router;
