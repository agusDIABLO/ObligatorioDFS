import mongoose, {Types} from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minlength: 3, maxlength: 50},
    duration: {type: Number, required: true},
    price: {type: Number, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}
},
{
    timestamps: true
});

export default serviceSchema;