import { Router } from "express";
import Stripe from "stripe";

const router = Router();

const mockCart = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 800 },
];

router.post("/payments/payment-intents", async (req, res) => {
  try {
    let id = req.query.id;
    let one = mockCart.find(each=> each.id === Number(id))
    //mandaria en una query o body directamente el total a cobrar
    //asi no tengo que buscar NADA
    if (one) {
      const data = {
        amount: one.price,
        currency: "usd",
        //metadata:  {} enviar datos del envío!
      }
      const stripe = new Stripe(process.env.STRIPE)
      const intent = await stripe.paymentIntents.create(data)
      const list = await stripe.paymentIntents.list()
      return res.status(201).json({ message: "done", payload: intent, list})
    }
    return res.status(500).json({ message: "not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
