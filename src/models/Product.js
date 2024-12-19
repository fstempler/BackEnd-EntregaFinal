import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true, index: {name: "idx_title"} },
    artist: { type: String, required: true, index: {name: "idx_artist"} },
    year: { type: Number, required: true },        
    price: { type: Number, required: true },
    condition: { type: String, default: true, index: {name: "idx_condition"} },
    stock: { type: Number, required: true },
    genre: { type: String, required: true, index: {name: "idx_genre"} },    
}, {
    timestamps: true,
    versionKey: false,
});

productSchema.index({ title: 1, artist: 1 }, { name: "idx_title_artist" });

const Product = model("Products", productSchema, "recordShop");

export default Product;
