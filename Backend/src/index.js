const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/DataBase");
const ContactModel = require("./model/Contact");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

connectDB();

app.post("/", async (req, res) => {
  try {
    const { name, email, messageSubject, message } = req.body;

    //  Validation
    if (!name) return res.status(400).send("Please fill the name !!");
    if (!email) return res.status(400).send("Please fill the email !!");
    if (!messageSubject) return res.status(400).send("Please fill the message Subject !!");
    if (!message) return res.status(400).send("Please fill the message !!");

    //  Create new document
    const newContact = new ContactModel({
      name,
      email,
      messageSubject,
      message,
    });

    // Save to DB
    await newContact.save();

    res.status(201).send("Data Submitted Successfully ");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
