import { Router } from "express";
import { register, login } from "../controllers/sessions.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
//router.post("/signout", signout);

export default router;
