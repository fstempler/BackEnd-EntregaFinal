import { Server } from "socket.io";
import RecordManager from "../managers/RecordManager.js"

const recordManager = new RecordManager();

// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", async (socket) => {              
        socketServer.emit("records-list", {records: await recordManager.getAll() });        

        socket.on("insert-record", async (data) => {
            try{
                console.log("SERVER ADDED BTN")
                await recordManager.insertOne(data);
                socketServer.emit("records-list", {records: await recordManager.getAll() });
            } catch (error) {
                socketServer.emit("error-message", {message: error.message });
            }
        });

        socket.on("delete-record", async (data) => {
            try{                
                await recordManager.deleteOneById(data.id);
                socketServer.emit("records-list", {records: await recordManager.getAll() });
            } catch (error) {
                socketServer.emit("error-message", {message: error.message });
            }
        });
    });

    
};