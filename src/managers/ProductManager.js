import ProductModel from "../models/Product.js"; // Importar el modelo Product
import ErrorManager from "../managers/ErrorManager.js";
import { isValidId } from "../config/db.js"

export default class ProductManager {
    
    #Product;

    constructor() {
        this.#Product = ProductModel;
    }
    async #findOneById(id) {        
        if (!isValidId(id)) {
            throw new ErrorManager("INVALID ID", 400);
        }

        return productFound;
    }

    async getAll(params) {
        try {
            const $and = [];
    
            if (params?.title) {
                $and.push({ title: new RegExp(`^${params.title.trim()}$`, "i") });
            }
            if (params?.artist) {
                $and.push({ artist: new RegExp(`^${params.artist.trim()}$`, "i") });
            }
            if (params?.genre) {
                $and.push({ genre: new RegExp(`^${params.genre.trim()}$`, "i") });
            }
            if (params?.year) {
                $and.push({ year: Number(params.year) }); // No se necesita regex para valores numéricos
            }
    
            const filters = $and.length > 0 ? { $and } : {};
    
            return await this.#Product.find(filters);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
    

    // Obtener un producto por ID
    async getOneById(id) {
        try {
            const productFound = await this.#Product.findById(id);            
            return productFound;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Insertar un nuevo producto
    async insertOne(data) {
        try {            
            const product = await this.#Product.create(data);
            return product;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualizar un producto por ID
    async updateOneById(id, data) {
        try {
            const productFound = await this.#findOneById(id);
            const newValues = { ...productFound, ...data}
            productFound.set(newValues);
            productFound.save();
            
            return productFound;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Eliminar un producto por ID
    async deleteOneById(id) {
        try {
            const productFound = await this.#findOneById(id);
            await productFound.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
