import express from "express";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";
//Enrutadores
import routerRecords from "./routes/records.router.js"
import routerArtists from "./routes/artists.router.js"
import routerViewHome from "./routes/home.view.router.js"


const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true}));

//Middleware
app.use(express.json())

// Configuración del motor de plantillas
configHandlebars(app);

//Routes Declaration
app.use("/api/public", express.static("./src/public"))
app.use("/api/records", routerRecords);
app.use("/api/artists", routerArtists);
app.use("/", routerViewHome);

// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render("error404", { title: "Error 404" });
});

// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);

