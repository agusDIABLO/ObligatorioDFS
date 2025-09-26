import express from "express";
import 'dotenv/config'; 
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";



const app = express();
const PORT = process.env.PORT ?? 3000;  

connectMongo();
connectRedis();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`));