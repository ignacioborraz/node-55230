import { Router } from "express";
import controller from "../controllers/cuentas.controller.js";

const { sumar, restar, dividir, multiplicar } = controller;

const cuentasRouter = Router();

cuentasRouter.get("/sumar/:n1/:n2", sumar);
cuentasRouter.get("/restar/:n1/:n2", restar);
cuentasRouter.get("/dividir/:n1/:n2", dividir);
cuentasRouter.get("/multiplicar/:n1/:n2", multiplicar);

export default cuentasRouter;
