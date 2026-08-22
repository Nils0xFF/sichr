import { argument, constant, message, object, string } from "@optique/core";
import { defineCommand } from "@optique/discover";
import { prompt } from "@optique/inquirer";

export const generate = defineCommand({
  path: ["generate"],
  parser: object({
    action: constant<"generate">("generate"),
  }),

  metadata: {
    brief: message`Generates a secure password`,
  },

  handler(value) {
    console.log("Generate password");
  },
});
