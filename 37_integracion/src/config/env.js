import dotenv from "dotenv";
import args from "./args.js";

const mode = args.mode;
const envPath = mode === "dev" ? "./.env.dev" : "./.env.prod";
dotenv.config({ path: envPath });

export default {
  LINK_DB: process.env.LINK_DB,
  PORT: process.env.PORT,
};
