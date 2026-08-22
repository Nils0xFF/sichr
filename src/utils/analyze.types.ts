import { WIDELY_SUPPORTED_SYMBOLS } from "./charsets.ts";

export type PasswordAnalysis = PartialAnalysis & {
  rawScore: number;
  strength: "weak" | "medium" | "strong";
};

export type PartialAnalysis = SuggestionsAndErrors & {
  score: number;
};

interface SuggestionsAndErrors {
  hints: Set<PasswordHint>;
  suggestions: Set<PasswordSuggestion>;
  warnings: Set<PasswordWarnings>;
}

export enum PasswordHint {
  SPECIAL_CHARACTERS = "Your password contains characters that might not be available everywhere",
}

export enum PasswordSuggestion {
  LENGTH = "Increase the length of your password",
  NUMBERS = "Add numbers to your password",
  LOWERCASE = "Add lowercase letters to your password",
  UPPERCASE = "Add uppercase letters to your password",
  SPECIAL_CHARACTERS = "Add special characters to your password",
}

export enum PasswordWarnings {
  TOO_SHORT = "Passwords should be at least 5 characters long",
  INVALID_CHARS = "Your password contains invalid special characters.",
  ONLY_NUMBERS = "Passwords should not only contain numbers",
  COMMON_PASSWORD = "Password was found in very common password lists",
}
