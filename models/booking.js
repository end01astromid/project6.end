import mongoose from "mongoose";

const bokkingShema = new mongoose.Schema({
    event_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Event',required: true},
    user_id: {type: String, required: true},
    created_at: { type: Date, default: Date.now }
});

bokkingShema.index({exvent_id: 1, user_id: 1},{unique: true});

export default mongoose.model("Booking", bokkingShema);