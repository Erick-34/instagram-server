require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("./config/auth")(passport);

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

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Application routes
const userRouter = require("./routes/user");

app.use("/api", userRouter);
// Listen to HTTP and WebSocket server
const PORT = process.env.PORT || 8080;

app.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}`);
});
