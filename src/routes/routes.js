const express = require("express");
const routes = express.Router();
const Controller = require("../controller/Controller");
const authantication = require("../auth/auth");

routes.post("/register", Controller.Register);
routes.post("/login", authantication.auth, Controller.Login);

module.exports = routes;
