import mongoose from "mongoose";
import { baseConstant } from "../constants/base-constants.mjs";
import 'dotenv/config';

const{MONGO_URL, MONGO_PORT, MONGO_DB, MONGO_BD_IN_USE, MONGO_LOCAL, MONGO_ATLAS} = process.env;
let MONGO_ATLAS_URI;

if (MONGO_BD_IN_USE == baseConstant.MONGO) {
    MONGO_ATLAS_URI = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
} else {
    MONGO_ATLAS_URI = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
}



export const connectMongo = async () => {
    try {
       await mongoose.connect(MONGO_ATLAS_URI, {})
        console.log('Levanto Mongo')
    } catch (err) {
        console.log('Hubo un error en la conexion de mongo', err);
        process.exit(1);
    }
}


connectMongo();