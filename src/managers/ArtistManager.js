import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";
import paths from "../utils/path.js";

export default class ArtistManager {
    #jsonFilename;
    #artists;

    constructor() {
        this.#jsonFilename = "artists.json";
        this.#artists = [];
        this.initializeArtists();
    }

    async initializeArtists() {
        try {
            this.#artists = await readJsonFile(paths.files, this.#jsonFilename) || [];
        } catch (error) {
            console.error("Error initializing artist list:", error.message);
            this.#artists = [];
        }
    }

    async $findOneById(id) {        
        this.#artists = await this.getAll();
        const artistFound = this.#artists.find((item) => item.id === Number(id));

        if (!artistFound) {
            throw new ErrorManager("ID NOT FOUND", 404);
        }

        return artistFound;
    }

    async getAll() {
        try {
            this.#artists = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#artists;
        } catch (error) {
            throw new ErrorManager("Failed to load artists", error.code);
        }
    }

    async getOneById(id) {
        try {
            const artistFound = await this.$findOneById(id);            
            return artistFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    
    async insertOne(data) {
        try {
            await this.getAll();
            const records = data?.artists?.map((item) => ({
                record: item.record ? Number(item.record) : null,
                quantity: 1 
            }));
         
            const artist = {
                id: generateId(this.#artists),
                records: records || [],
            };

            this.#artists.push(artist);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#artists);

            return artist;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    
    async addRecordToArtist(artistId, recordData) {
        try {
            await this.getAll();
            
            const artistIndex = this.#artists.findIndex(artist => artist.id === Number(artistId));

            if (artistIndex === -1) {
                throw new Error(`ARTIST WITH ID ${artistId} WAS NOT FOUND`);
            }

            const existingRecordIndex = this.#artists[artistIndex].records.findIndex(
                record => record.record === recordData.record
            );

            if (existingRecordIndex !== -1) {
                this.#artists[artistIndex].records[existingRecordIndex].quantity += recordData.quantity || 1;
            } else {
                this.#artists[artistIndex].records.push({
                    record: recordData.record ? Number(recordData.record) : null,
                    quantity: recordData.quantity || 1,
                });
            }

            await writeJsonFile(paths.files, this.#jsonFilename, this.#artists);

            return this.#artists[artistIndex];
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}
