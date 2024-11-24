import { Router } from "express"
import ArtistManager from "../managers/ArtistManager.js"

const router = Router();
const artistManager = new ArtistManager();

router.get("/", async (req, res) => {
    try {
        const artists = await artistManager.getAll();
        res.status(200).json({ status: "success", payload: artists})
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const artist = await artistManager.getOneById(req.params?.id);
        res.status(200).json({ status: "success", payload: artist})
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

router.post("/", async (req, res) => {    
    try {        
        const artist = await artistManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: artist})
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

router.post("/:id/records", async (req, res) => {
    try {
        const artistId= req.params.id;
        const recordData = req.body;

        const updatedArtist = await artistManager.addRecordToArtist(artistId, recordData);

        res.status(200).json({ status: "success", payload: updatedArtist });
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message });
    }
});



export default router;