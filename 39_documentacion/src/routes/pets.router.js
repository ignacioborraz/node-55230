import { Router } from "express";
import { createPet, createPetWithImage, getAllPets, updatePet, deletePet } from "../controllers/pets.controller.js";
import uploader from "../config/uploader.js";

const router = Router();

router.post("/", createPet);
router.post("/withimage",uploader.single("image"),createPetWithImage);
router.get("/", getAllPets);
router.put("/:pid", updatePet);
router.delete("/:pid", deletePet);

export default router;
