"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
// Create an instance of the Command object
const program = new commander_1.Command();
program
    .version("1.0.0")
    .description("My Native App CLI")
    .command("hello <name>")
    .description("Say hello to someone")
    .action((name) => {
    console.log(`Hello, ${name}!`);
});
// Parse the command-line arguments
program.parse(process.argv);
