import { Router } from "express"
import RecordManager from "../managers/RecordManager.js"

const router = Router();
const recordManager = new RecordManager();

router.get("/", async (req, res) => {
    try {
        const records = await recordManager.getAll();
        res.status(200).json({ status: "success", payload: records})
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const record = await recordManager.getOneById(req.params?.id);
        res.status(200).json({ status: "success", payload: record})
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

router.post("/", async (req, res) => {    
    try {        
        const record = await recordManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: record})
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

router.put("/:id", async (req, res) => {
    try {        
        const record = await recordManager.updateOneById(req.params?.id, req.body);
        res.status(200).json({ status: "success", payload: record})
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await recordManager.deleteOneById(req.params?.id);
        res.status(200).json({ status: "success" })
    } catch (error) {
        res.status(error.code || 500).json({ status: "ERROR", message: error.message});
    }
});

export default router; 