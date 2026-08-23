import { message, object } from "@optique/core";
import { defineCommand } from "@optique/discover";

export const generate = defineCommand({
  path: ["generate"],
  parser: object({}),

  metadata: {
    brief: message`Generates a secure password`,
  },

  handler() {
    console.log("Generate password");
  },
});
