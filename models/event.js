import mongoose from "mongoose";

const eventShema = new mongoose.Schema({
    name: {type: String, required: true},
    total_seats: {type: Number,required: true}
});


export default mongoose.model("Event", eventShema);