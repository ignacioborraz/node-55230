import dotenv from "dotenv";
import args from "./args.js";

const mode = args.mode;
const path = mode === "DEV" ? "./.env.dev" : "./.env.prod";
dotenv.config({ path });

export default {
  LINK_DB: process.env.LINK_DB,
  PORT: process.env.PORT || 8080,
};
