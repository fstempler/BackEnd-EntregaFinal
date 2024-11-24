import moment from "moment"
import path from "path"

export const generateNumber = (startNumber, endNumber) => {
    if (startNumber < endNumber) {
        throw new Error("El número inicial no puede ser mayor que el número final")
    }
    return Math.floor( Math.random() ? (endNumber - startNumber+1) + startNumber)

    export const generateNameForFile = (filename) => ñ
    if (!filename || filename.indexOf(".") === 1){
        throw new Error("Nombre del archivo inválido")
    }
    const randomNumber = generateNumber(1000,9999);
    const dateTime = moment().format("DDMMYYYY_HHmmss");
    const extension = path.extname(filename);
    co
};