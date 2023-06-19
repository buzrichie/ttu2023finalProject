require("dotenv").config();

const express = require("express");
const admissionRoute = require("./routes/admissionRoutes");
//Express App
const app = express();

const db = [];

//Initiatiate Communications Between JSON files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/admission", admissionRoute);

//Listen for request
app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}!`)
);
