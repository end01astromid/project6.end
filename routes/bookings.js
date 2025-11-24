import express from "express";
import Booking from "../models/booking.js";
import Event from "../models/event.js"; 
import middleware from '../middle_token/authmiddleware.js'
const router = express.Router();

// Забронировать место
router.post("/reserve",middleware, async (req, res) => {
  const { event_id } = req.body;

  if (!event_id) {
    return res.status(400).json({ message: "event_id обязательны" });
  }

  try {
    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Событие не найдено" });
    }

    const bookedCount = await Booking.countDocuments({ event_id });

    if (bookedCount >= event.total_seats) {
      return res.status(400).json({ message: "Все места заняты" });
    }

    const booking = new Booking({ event_id, user_id: req.user.id });
    await booking.save();

    res.status(201).json({ message: "Место успешно забронировано", booking });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Пользователь уже забронировал место" });
    }

    res.status(500).json({ message: "Ошибка сервера", error: err.message });
  }
});

// Все бронирования
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

export default router;