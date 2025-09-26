import { createClient } from "redis";
import "dotenv/config"

export const redisClient = createClient({
    url: process.env.REDIS_URI || "redis://localhost:6379",
    // socket: {
    //     reconnectStrategy: (retries) => {
    //         console.log(`♻️ Reintentando conexión (${retries})`);
    //         // Retorna el tiempo en ms antes de volver a intentar
    //         return Math.min(retries * 1000, 10000); // espera creciente hasta 3s
    //     }
    // }
});

redisClient.on("error", (err) => console.log('Hubo un error al conectar a Redis', err));


redisClient.on("reconnecting", () => {
    console.log("♻️  Intentando reconectar a Redis...");
});

export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log("Conectado a Redis")
    }
}

connectRedis();