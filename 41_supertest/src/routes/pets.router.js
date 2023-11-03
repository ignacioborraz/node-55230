import { Router } from "express";
import { createPet, createPetWithImage, getAllPets, updatePet, deletePet } from "../controllers/pets.controller.js";
import uploader from "../config/uploader.js";
import isUser from "../middlewares/isUser.js";
import areValidPropsPet from "../middlewares/areValidPropsPet.js";

const router = Router();

router.post("/", isUser, areValidPropsPet, createPet);
router.post("/withimage", areValidPropsPet, uploader.single("image"), createPetWithImage);
router.get("/", getAllPets);
router.put("/:pid", isUser, updatePet);
router.delete("/:pid", isUser, deletePet);

export default router;
