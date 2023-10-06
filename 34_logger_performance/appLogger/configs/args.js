import { Command } from "commander";

const program = new Command();

program.option("--mode <mode>", "mode", "DEV");

program.parse();

export default program.opts();
