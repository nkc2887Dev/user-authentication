const jwt = require("jsonwebtoken");
const userModel = require("../model/registerModel");
require("dotenv").config({ path: "config.env" });
const secret_key = process.env.SECRET_KEY;

exports.auth = (req, res, next) => {
  try { 
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const isVerify = jwt.verify(token, secret_key);
    if (isVerify) {
      next();
    } else {
      res.status(400).json({
        status: "failure",
        message: "provide valid authentication token",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failure",
      error,
    });
  }
};
