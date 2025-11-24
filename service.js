import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import bookingsRouter from "./routes/bookings.js";
import eventsRouter from "./routes/events.js"; 
import usersRouter from './routes/users.js';


const app = express();
app.use(express.json());


app.use("/api/events", eventsRouter);
app.use("/api/bookings", bookingsRouter);
app.use('/api/users', usersRouter)


async function startDB() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("MongoDB подключен");
  } catch (err) {
    console.error("Ошибка MongoDB:", err.message);
  }
}
startDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));