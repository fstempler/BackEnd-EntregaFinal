import mongoose from "mongoose";
import ProductModel from "../models/Product.js"; // Ajusta la ruta si es necesario

const updateStockForProducts = async () => {
    try {
        await mongoose.connect("mongodb+srv://fmstempler:Fede1234@cluster0.0uncw.mongodb.net/test2");

        const result = await ProductModel.updateMany(
            { stock: { $exists: false } }, // Filtrar documentos sin el campo "stock"
            { $set: { stock: 10 } }        // Agregar el campo "stock" con un valor predeterminado
        );

        console.log(`Modified ${result.nModified} documents.`);
        mongoose.connection.close();
    } catch (error) {
        console.error("Error updating stock:", error.message);
    }
};

updateStockForProducts();
