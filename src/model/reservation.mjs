import mongoose from "mongoose";
import reservationSchema from "./schemas/reservation-schema.mjs";

const reservation = mongoose.model("Reservation", reservationSchema);

export default reservation;