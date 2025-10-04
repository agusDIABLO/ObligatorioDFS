import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    barberId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    status: {type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending'} 
    },
{
    timestamps: true
}); 

export default reservationSchema;