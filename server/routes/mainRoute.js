/** @format */

const express = require("express");
const route = express.Router();
const db = require("../database/index");

route.get("/", (req, res) => {
  res.send("Server is running");
});

route.post("/contact", async (req, res) => {
  const { first_name, last_name, email, message } = req.body;

  try {
    const newContact = await db.query(
      "INSERT INTO contact_details(first_name,last_name,email,message,created_at) VALUES($1,$2,$3,$4,CURRENT_TIMESTAMP) RETURNING *",
      [first_name, last_name, email, message]
    );
    res.send({ data: newContact.rows[0] });
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
