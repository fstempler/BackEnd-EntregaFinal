import Cart from "../models/Cart.js";
import ProductManager from "./ProductManager.js"; // Importar ProductManager
import ErrorManager from "../managers/ErrorManager.js";

export default class CartManager {
    #productManager;

    constructor() {
        this.#productManager = new ProductManager(); // Instanciar ProductManager
    }

    // Crear un nuevo carrito
    async createCart() {
        const newCart = new Cart();
        return await newCart.save();
    }

    // Obtener un carrito por su ID
    async getCartById(id) {
        try {
            const cart = await Cart.findById(id).populate("products.product");
            if (!cart) {
                throw new ErrorManager("Cart not found", 404);
            }
            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Agregar un producto al carrito
    async addProductToCart(cid, pid) {
        try {
            // Verificar si el producto existe utilizando ProductManager
            const product = await this.#productManager.getOneById(pid);
            if (!product) {
                throw new ErrorManager("Product not found", 404);
            }

            // Buscar el carrito por ID
            const cart = await Cart.findById(cid);
            if (!cart) {
                throw new ErrorManager("Cart not found", 404);
            }

            // Buscar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex((p) => p.product.toString() === pid);

            if (productIndex !== -1) {
                // Incrementar la cantidad si ya existe
                cart.products[productIndex].quantity += 1;
            } else {
                // Agregar el producto al carrito
                cart.products.push({ product: pid, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
