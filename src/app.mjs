import express from "express";
import 'dotenv/config'; 
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";
import v1Publicas from "./routes/v1/public.mjs";
import v1Categorias from "./routes/v1/categories.mjs";
import { xssSanitizer } from "./middleware/sanitizer-middleware.mjs";


const app = express();
const PORT = process.env.PORT ?? 3000;  

connectMongo();
connectRedis();

app.use(express.json());


app.use(xssSanitizer);


app.use("/api/v1", v1Publicas);

app.use("/api/v1/categories", v1Categorias);



app.get("/", (req, res) => {
    res.send("Hola mundo");
});


app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`));


app.use