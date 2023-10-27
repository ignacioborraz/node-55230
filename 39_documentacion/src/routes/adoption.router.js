import { Router } from "express";
import { createAdoption, getAllAdoptions, getAdoption } from "../controllers/adoptions.controller.js";

const router = Router();

router.post("/:uid/:pid", createAdoption);
router.get("/", getAllAdoptions);
router.get("/:aid", getAdoption);

export default router;
