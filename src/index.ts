import { message, commandLine, type Mode } from "@optique/core";
import { run } from "@optique/run";

import { runProgram, type StaticCommand } from "@optique/discover";
import { analyze } from "./commands/analyze.ts";
import { confirm, select, Separator } from "@inquirer/prompts";
import { generate } from "./commands/generate.ts";
import { exit } from "node:process";
import { styleText } from "node:util";

process.addListener("SIGINT", () => {
  exit(1);
});

process.addListener("SIGTERM", () => {
  exit(1);
});

// Listen for prompt exit via CTRL + C and close program
process.addListener("uncaughtException", (error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log(styleText("bold", "See you next time!"));
    exit(0);
  } else {
    throw error;
  }
});

async function startInteractiveMode() {
  // console.clear();
  console.log(styleText("bold", "Welcome to password-cli!"));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commandChoice = await select<StaticCommand<Mode, any> | null>({
    message: styleText("underline", "What do you want to do?"),
    choices: [
      {
        name: "Analyze password strength",
        value: analyze,
      },
      {
        name: "Generate secure password",
        value: generate,
        disabled: true,
      },
      new Separator(),
      {
        name: "Exit",
        value: null,
      },
    ],
  });

  executeCommand(commandChoice);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function executeCommand(commandChoice: StaticCommand<Mode, any> | null) {
  if (commandChoice !== null) {
    const value = await run(commandChoice.parser);
    await commandChoice.handler(value);
    const tryAgain = await confirm({ message: "Try again?", default: true });
    if (!tryAgain) {
      startInteractiveMode();
      return;
    } else {
      executeCommand(commandChoice);
    }
  } else {
    console.log(styleText(["bold", "blue"], "See you next time!"));
    exit(0);
  }
}

async function main() {
  if (process.argv.length <= 2) {
    startInteractiveMode();
  } else {
    await runProgram({
      commands: [analyze, generate],
      metadata: {
        name: "password-cli",
        version: "0.0.1",
        brief: message`A simple CLI tool to analyze password strength and generate secure passwords`,
        description: message`Run ${commandLine("password-cli")} without a command to open the interactive command selector.`,
      },
      help: "both",
    });
  }
}

main();
