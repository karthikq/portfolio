/** @format */

const express = require("express");
const route = express.Router();
const db = require("../database/index");

route.post("/contact", async (req, res) => {
  //const { first_name, last_name, email, message } = req.body;
  console.log(req.body);
});

module.exports = route;
