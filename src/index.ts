#!/usr/bin/env node

import { Command } from "commander";

// Create an instance of the Command object
const program = new Command();

program
  .version("1.0.0")
  .description("My Native App CLI")
  .command("hello <name>")
  .description("Say hello to someone")
  .action((name: string) => {
    console.log(`Hello, ${name}!`);
  });

// Parse the command-line arguments
program.parse(process.argv);
