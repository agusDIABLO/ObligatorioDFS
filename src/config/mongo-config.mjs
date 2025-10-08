import mongoose from "mongoose";
import "dotenv/config";
import { baseConstant } from "../constants/base-constants.mjs"; 
import { databaseTarget } from "../constants/base-mongo.mjs";




const{MONGO_URL, MONGO_PORT, MONGO_DB, MONGO_BD_IN_USE, MONGO_LOCAL, MONGO_ATLAS, MONGO_ATLAS_URI, MONGO_ATLAS_USER, MONGO_ATLAS_PASS} = process.env;
let mongoUri;

if (MONGO_BD_IN_USE == 'atlas') {
    mongoUri = MONGO_ATLAS_URI;
} else {
    mongoUri = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
}



// Función asíncrona para conectar a la base de datos MongoDB
export async function connectMongo() {
    try {
        console.log('intentando conexion mongo', mongoUri, MONGO_DB, MONGO_BD_IN_USE)
        // Se intenta conectar usando Mongoose con opciones recomendadas
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });
        
        // Si la conexión es exitosa, imprime mensaje en consola
        console.log("Conectado a MongoDB correctamente");
    } catch (err) {
        // Si hay error al conectar, imprime el error en consola
        console.error("Error al conectar a MongoDB:", err.message);

        // Termina la ejecución de la aplicación ya que no puede continuar sin DB
        process.exit(1);
    }
}




