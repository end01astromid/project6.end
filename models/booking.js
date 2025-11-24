import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ← ссылка на User
  created_at: { type: Date, default: Date.now }
});


bookingSchema.index({ event_id: 1, user_id: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
