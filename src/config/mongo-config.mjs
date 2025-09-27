import mongoose from "mongoose";
import 'dotenv/config';

const{MONGO_URL, MONGO_PORT, MONGO_DB, MONGO_BD_IN_USE, MONGO_LOCAL, MONGO_ATLAS, MONGO_ATLAS_URI} = process.env;
let mongoUri;

if (MONGO_BD_IN_USE === 'atlas') {
    mongoUri = MONGO_ATLAS_URI;
} else {
    mongoUri = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
}



export const connectMongo = async () => {
    try {
       await mongoose.connect(mongoUri, {})
        console.log('Levanto Mongo')
    } catch (err) {
        console.log('Hubo un error en la conexion de mongo', err);
        process.exit(1);
    }
}


connectMongo();