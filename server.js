import {} from 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initializes application
const app = express();

// Enable cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// Listen to HTTP and WebSocket server
const PORT = process.env.PORT || 8080;

app.listen({ port: PORT }, () => {
  console.log(`server ready at http://localhost:${PORT}`);
});