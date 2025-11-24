import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  total_seats: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // кто создал событие
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);
