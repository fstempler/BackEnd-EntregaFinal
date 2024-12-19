
import { connect, Types } from "mongoose";

export const connectDB = async () => {
    const URL = "mongodb+srv://fmstempler:Fede1234@cluster0.0uncw.mongodb.net/test2";
    try {
        await connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("FAILED CONNECTION TO MONGODB", error.message)
    }
}

export const isValidId = (id) => {
    return Types.ObjectId.isValid(id);
}