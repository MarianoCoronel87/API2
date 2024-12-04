import { Server } from "socket.io";
import productoManager from "../managers/productoManager.js";

const ProductoManager = new productoManager();

// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", async (socket) => {
        console.log("Conexión establecida", socket.id);

        // Envía la lista de productoes al conectarse
        socketServer.emit("products-list", { products: await ProductoManager.getAll() });

        socket.on("insert-producto", async (data) => {
            try {
                await ProductoManager.insertOne(data);

                // Envía la lista de productoes actualizada después de insertar
                socketServer.emit("products-list", { products: await ProductoManager.getAll() });
            } catch (error) {
                // Envía el mensaje de error
                socketServer.emit("error-message", { message: error.message });
            }
        });

        socket.on("delete-producto", async (data) => {
            try {
                await productoManager.deleteOneById(Number(data.id));

                // Envía la lista de productoes actualizada después de insertar
                socketServer.emit("products-list", { products: await ProductoManager.getAll() });
            } catch (error) {
                // Envía el mensaje de error
                socketServer.emit("error-message", { message: error.message });
            }
        });

        // Escucha el evento de desconexión del cliente
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente"); // Indica que un cliente se desconectó
        });
    });
};