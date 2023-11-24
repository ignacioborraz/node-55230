import "dotenv/config.js";
import express from "express";
import cors from "cors";
import router from "./router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const PORT = process.env.PORT || 8080;
const ready = console.log("server ready on port", PORT);

app.listen(PORT, ready);
