/** @format */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/mainRoute"));

app.listen(port, () => {
  console.log("server is running");
});
