const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  login,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/studentControllers");
const {
  authenticateRoute,
  hasRole,
  isOwner,
} = require("../middleware/authenticateRoute");
const {
  restrictUpdateFieldsMiddleware,
} = require("../middleware/restrictUpdateFields");

router.post("/login", login);
router.use(authenticateRoute);
//Routes for various Students
router.get("/", hasRole("admin"), getAllStudents);
router.post("/", hasRole("admin"), createStudent);
router.get("/:id", isOwner || hasRole("admin"), getSingleStudent);
router.put(
  "/:id",
  isOwner || hasRole("admin"),
  restrictUpdateFieldsMiddleware,
  updateStudent
);
router.delete("/:id", hasRole("admin"), deleteStudent);

module.exports = router;
