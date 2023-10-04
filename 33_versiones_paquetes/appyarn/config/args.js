import { Command } from "commander";

const args = new Command();

args
  .option("--puerto <puerto>", "puerto", 9000)
  .option("--ambiente <ambiente>", "ambiente", "DEV");

args.parse();

export default args.opts(); //exporta { puerto, ambiente }
