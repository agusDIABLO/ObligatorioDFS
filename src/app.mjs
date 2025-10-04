import express from "express";
import 'dotenv/config'; 
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";
import v1Publicas from "./routes/v1/public.mjs";
import v1Categorias from "./routes/v1/categories.mjs";
import v1Servicios from "./routes/v1/services.mjs";
import { xssSanitizer } from "./middleware/sanitizer-middleware.mjs";


const app = express();
const PORT = process.env.PORT ?? 3000;  

connectMongo();
connectRedis();

app.use(express.json());


app.use(xssSanitizer);


// RUTAS DE LOGIN Y REGISTRO
app.use("/api/v1", v1Publicas);



// RUTAS DE CATEGORIAS
app.use("/api/v1/categories", v1Categorias);




// RUTAS DE SERVICIOS
app.use("/api/v1/services", v1Servicios);


app.get("/", (req, res) => {
    res.send("Hola mundo");
});


app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`));


app.use