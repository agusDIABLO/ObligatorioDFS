import mongoose, {Types} from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, 
        required: true,
        lowercase: true, // convierte a minúsculas
        match: [/.+@.+\..+/, 'Por favor ingresa un email válido']},
    phone: {type: Number ,required: true},
    password: {type: String, required: true},
    role: {type: [String], enum: ['customer', 'admin', 'barber'], default: ['customer']},
    plan: {type: String, enum: ['plus', 'premium'], default: 'plus'},
    limitReservations: {type: Number, default: 10} 
    },
{
    timestamps: true
});
    
    //indice email unico y ascendente
    userSchema.index({ email: 1 }, { unique: true });

    export default userSchema;