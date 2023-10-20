import { Command } from "commander";

const args = new Command();

args.option("--mode <mode>", "mode", "dev");
args.parse();

const options = args.opts();

export default options;
