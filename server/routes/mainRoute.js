/** @format */

const express = require("express");
const route = express.Router();
const db = require("../database/index");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

route.get("/", (req, res) => {
  res.send("Server is running");
});

route.post("/contact", async (req, res) => {
  const { first_name, last_name, email, message } = req.body;
  console.log(email);

  transporter
    .sendMail({
      from: "karthikemail99@gmail.com",
      to: email,
      subject: "contact@karthikjs",
      html: "<h2>Thanks for contacting Karthik</h2> <p>I will be in contact with you shortly</p> <p>Thanks</p>",
    })
    .then(async (res) => {
      try {
        const newContact = await db.query(
          "INSERT INTO contact_details(first_name,last_name,email,message,created_at) VALUES($1,$2,$3,$4,CURRENT_TIMESTAMP) RETURNING *",
          [first_name, last_name, email, message]
        );
        res.send({ data: newContact.rows[0] });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = route;
