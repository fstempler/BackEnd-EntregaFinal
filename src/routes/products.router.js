import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import ProductModel from "../models/Product.js";

const router = Router();
const productManager = new ProductManager();

router.get("/explain", async (req, res) => {
    try {
        const filters = { title: "The Nightfly"}                
        const result = await ProductModel.find(filters).explain();
        res.status(200).json({ status: "success", payload: result.executionStats });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

// Ruta GET: Obtener todos los productos 
router.get("/", async (req, res) => {
    try {        
        const products = await productManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

// Ruta GET: Obtener un producto por ID
router.get("/:id", async (req, res) => {
    try {
        const product = await productManager.getOneById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: "ERROR", message: "Product not found" });
        }
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

// Ruta POST: Crear un nuevo producto
router.post("/", async (req, res) => {
    try {
        const product = await productManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        res.status(400).json({ status: "ERROR", message: error.message });
    }
});

// Ruta PUT: Actualizar un producto por ID
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await productManager.updateOneById(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ status: "ERROR", message: "Product not found" });
        }
        res.status(200).json({ status: "success", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

// Ruta DELETE: Eliminar un producto por ID
router.delete("/:id", async (req, res) => {
    try {
        const result = await productManager.deleteOneById(req.params.id);
        if (!result.product) {
            return res.status(404).json({ status: "ERROR", message: "Product not found" });
        }
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

export default router;
