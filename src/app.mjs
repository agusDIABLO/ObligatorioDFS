import express from "express";
import 'dotenv/config'; 
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";
import v1Publicas from "./routes/v1/public.mjs";
import v1Categorias from "./routes/v1/categories.mjs";
import v1Servicios from "./routes/v1/services.mjs";
import v1Usuarios from "./routes/v1/user.mjs";
import v1Reservations from "./routes/v1/reservations.mjs";
import v1Images from "./routes/v1/image.mjs";
import { xssSanitizer } from "./middleware/sanitizer-middleware.mjs";
import cors from "cors";


const app = express();
const PORT = process.env.PORT ?? 3000;  

const startServer = async () => {
    try {
        await connectMongo();
        await connectRedis();

        app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`));
    } catch (err) {
        console.error("No se pudo iniciar el servidor:", err);
        process.exit(1);
    }
};

startServer();


// 🛠 configuración CORS
//app.use(cors({
  //origin: ["http://localhost:5176", "https://obligatorio-dfs-inky.vercel.app"],
  //credentials: true,
//}));

app.use(cors({
  origin: ["http://localhost:5176", "https://obligatorio-dfs-inky.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


//app.use(express.json());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use(xssSanitizer);


// RUTAS DE LOGIN Y REGISTRO
app.use("/api/v1", v1Publicas);



// RUTAS DE CATEGORIAS
app.use("/api/v1/categories", v1Categorias);




// RUTAS DE SERVICIOS
app.use("/api/v1/services", v1Servicios);



// RUTAS DE USUARIOS
app.use("/api/v1/users", v1Usuarios);



// RUTAS DE RESERVAS
app.use("/api/v1/reservations", v1Reservations);



// RUTAS DE IMAGENES
app.use("/api/v1/images", v1Images);


app.get("/", (req, res) => {
    res.send("Hola mundo");
});


app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`));


app.use