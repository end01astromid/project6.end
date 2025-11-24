import express from "express";
import Event from "../models/event.js";
import middleware from '../middle_token/authmiddleware.js'
const router = express.Router();

// Создать событие
router.post("/" ,middleware, async (req, res) => {
  const { name, total_seats } = req.body;
  if (!name || !total_seats)
    return res.status(400).json({ message: "Все поля обязательны" });

  try {
    const event = new Event({ name, total_seats, user_id: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Получить все события
router.get("/",async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

export default router;