import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import paths from "../utils/path.js";
import { convertToBool } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js"

export default class RecordManager {
    #jsonFilename;
    #records;

    constructor() {
        this.#jsonFilename = "records.json";
    }

    async $findOneById(id) {        
        this.#records = await this.getAll();
        const recordFound = this.#records.find((item) => item.id === Number(id));

        if (!recordFound) {
            throw new ErrorManager("ID NOT FOUND", 404)
        }
        return recordFound;
    };

    async getAll() {
        try {
            this.#records = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#records;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
        
    };

    async getOneById(id) {
        try {
            const recordFound = await this.$findOneById(id);            
            return recordFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
        
    };
    
    async insertOne(data) {
        try {
            const { title, status, stock } = data;

            if (!title || !status  || !stock) {
                throw new ErrorManager("MISSING MANDATORY DATA", 400);
            }
            const record = {
                id: generateId(await this.getAll()),
                title,
                status,
                stock,
            };
            this.#records.push(record);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#records);

            return record;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
        
    };

    async updateOneById(id, data) {
        try {
            const { title, status, stock } = data;
            const recordFound = await this.$findOneById(id);            

            const record = {
                id: recordFound.id,
                title: title || recordFound.title,
                status: status ? convertToBool(status) : recordFound.status,
                stock: stock ? Number(stock) : recordFound.stock,
            };

            const index = this.#records.findIndex((item) => item.id === Number(id));
            this.#records[index] = record;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#records)            

            return record;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
        
    };

    async deleteOneById(id) {
        try {
            const recordIndex = this.#records.findIndex((item) => item.id === Number(id));
            if (recordIndex === -1) {
                throw new ErrorManager("ID NOT FOUND", 404);
            }
            this.#records.splice(recordIndex, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#records);
            return { message: "Record deleted successfully" };
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
    

}
