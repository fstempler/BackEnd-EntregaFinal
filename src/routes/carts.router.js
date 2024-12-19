import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import Product from "../models/Product.js";

const router = Router();
const cartManager = new CartManager();

// Ruta POST: Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ status: "success", payload: newCart });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

// Ruta GET: Obtener productos de un carrito por ID
router.get("/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: "ERROR", message: "Cart not found" });
        }
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

// Ruta POST: Agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        // Validar si el producto existe
        const productExists = await Product.findById(pid);
        if (!productExists) {
            return res.status(404).json({ status: "ERROR", message: "Product not found" });
        }

        // Agregar el producto al carrito
        const updatedCart = await cartManager.addProductToCart(cid, pid);
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: error.message });
    }
});

export default router;
