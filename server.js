require("dotenv");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to database
mongoose
  .connect("mongodb://localhost:27017/instagram-databases", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

// Initializes application
const app = express();

// Enable cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

//Application routes

// Listen to HTTP and WebSocket server
const PORT = process.env.PORT || 8080;

app.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}`);
});
