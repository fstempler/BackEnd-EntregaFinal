import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";
// Enrutadores
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerViewHome from "./routes/home.view.router.js";

dotenv.config();

const app = express();

//Conexión a MongoDB
connectDB();

const PORT = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración del motor de plantillas
configHandlebars(app);

// Declaración de rutas
app.use("/api/public", express.static("./src/public"));
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", routerViewHome);

// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render("error404", { title: "Error 404" });
});

// Servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de WebSocket
configWebsocket(httpServer);
