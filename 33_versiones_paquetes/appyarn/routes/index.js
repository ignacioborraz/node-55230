import { Router } from "express";
import cuentasRouter from "./cuentas.route.js";

const router = Router();

router.use("/cuentas", cuentasRouter);

export default router;
