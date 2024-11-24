import multer from "multer"
import paths from "./paths.js"
import  { generateNameForFile } from  './ramdom.js'

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, paths.images);
    }
})