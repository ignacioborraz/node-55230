import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.render('register');
})
//deberia llamar al controlador

export default router;