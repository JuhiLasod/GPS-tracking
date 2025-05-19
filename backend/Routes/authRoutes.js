import express from "express";
// import {sendLocController} from "../Controllers/sendLocController";
import {sendLocController} from "../Controllers/sendLocController.js";
const router=express.Router();
router.post("/sendlocation",sendLocController);
export default router;