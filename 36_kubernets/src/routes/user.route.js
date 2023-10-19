import { Router } from "express";
import usersFake from "../data/users.fake.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push(usersFake());
  }
  res.json({ users });
});

export default router;
