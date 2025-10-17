import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3, maxlength: 30 }
},
    {
        timestamps: true
    });

export default categorySchema;