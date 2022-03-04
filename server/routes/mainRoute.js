/** @format */

const express = require("express");
const route = express.Router();
const db = require("../database/index");

route.post("/contact", async (req, res) => {
  const { first_name, last_name, email, message } = req.body;

  const newContact = await db.query(
    "INSERT INTO contact_details(first_name,last_name,email,message) VALUES($1,$2,$3,$4) RETURNING *",
    [first_name, last_name, email, message]
  );

  res.send({ data: newContact.rows[0] });
});

module.exports = route;
