require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//Imported Route files
const admissionRoutes = require("./routes/admissionRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const financeRoutes = require("./routes/financeRoutes");
const parentGuardianRoutes = require("./routes/parentGuardianRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const studentRoutes = require("./routes/studentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const academicLevelRoutes = require("./routes/academicLevelRoutes");

//Express App
const app = express();

//Connect to mongoDb atlas
mongoose
  .connect(process.env.db_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    //Listen for request
    app.listen(process.env.PORT, () =>
      console.log(
        `connected succesful and listening on port ${process.env.PORT}!`
      )
    );
  })
  .catch((error) => {
    console.log(error);
  });

//Middleware to extablish Communications from requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/admission", admissionRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/parent-Guardian", parentGuardianRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/teacher", teacherRoutes);
