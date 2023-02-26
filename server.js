const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8056;
require("./src/db/conn"); //mongoDB Database
const router = require("./src/routes/routes")

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/user", router)

// Litening Port
app.listen(port, () => console.log("Listening...."));
