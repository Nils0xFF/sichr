import { argument, message, object, string } from "@optique/core";
import { defineCommand } from "@optique/discover";
import { prompt } from "@optique/inquirer";
import { analyzePassword } from "../utils/analyze-password.ts";
import { styleText, type InspectColor } from "node:util";

export const analyze = defineCommand({
  path: ["analyze"],
  parser: object({
    password: prompt(argument(string({ metavar: "PASSWORD" })), {
      type: "password",
      mask: true,
      message: styleText(["underline"], "Enter the password to analyze:"),
    }),
  }),

  metadata: {
    brief: message`Analyzes the strength of the given password`,
  },

  handler(value) {
    const rating = analyzePassword(value.password);
    if (rating.warnings.size > 0) {
      console.log(
        styleText(["bold", "red"], "Very insecure or invalid password!!"),
      );
      console.log(styleText(["red"], "Warnings:"));
      for (const warning of rating.warnings) {
        console.log(styleText(["red"], " - " + warning));
      }
    } else {
      let color: InspectColor = "white";
      switch (rating.strength) {
        case "weak":
          color = "red";
          break;
        case "medium":
          color = "yellow";
          break;
        case "strong":
          color = "green";
          break;
      }

      console.log(
        styleText(
          [color, "bold"],
          "Your password is scores a " + rating.score + " out of 100",
        ),
      );
      if (rating.suggestions.size > 0) {
        console.log(styleText(["gray"], "Suggestions:"));
        for (const suggestion of rating.suggestions) {
          console.log(styleText(["gray"], " - " + suggestion));
        }
      }
      if (rating.hints.size > 0) {
        console.log(styleText(["gray"], "Hints:"));
        for (const hint of rating.hints) {
          console.log(styleText(["gray"], " - " + hint));
        }
      }
    }
  },
});
