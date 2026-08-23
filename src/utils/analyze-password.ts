import {
  PasswordHint,
  PasswordSuggestion,
  PasswordWarnings,
  type PartialAnalysis,
  type PasswordAnalysis,
} from "./analyze.types.ts";
import {
  INCLUDES_COMMONLY_REJECTED,
  INCLUDES_LOWERCASE,
  INCLUDES_NUMBERS,
  INCLUDES_SPECIAL,
  INCLUDES_UPPERCASE,
  NUMBERS_ONLY,
  ONLY_BASIC_VALID_CHARS,
} from "./patterns.ts";

export function analyzePassword(password: string): PasswordAnalysis {
  let { score, suggestions, warnings, hints } = initPartialAnalysis(100);

  const validationSteps = [analyzePasswordLength, analyzePasswordCharset];

  for (const step of validationSteps) {
    const stepResult = step(password);
    score += stepResult.score;
    suggestions = new Set([...suggestions, ...stepResult.suggestions]);
    warnings = new Set([...warnings, ...stepResult.warnings]);
    hints = new Set([...hints, ...stepResult.hints]);
  }

  return {
    rawScore: score,
    score: Math.min(100, Math.max(score, 0)),
    strength: score > 75 ? "strong" : score > 50 ? "medium" : "weak",
    suggestions,
    warnings,
    hints,
  };
}

function analyzePasswordLength(password: string): PartialAnalysis {
  let score = 0;
  const { suggestions, warnings, hints } = initPartialAnalysis();

  if (password.length < 5) {
    score += -Infinity;
    warnings.add(PasswordWarnings.TOO_SHORT);
  } else if (password.length < 10) {
    score += -Math.min((10 - password.length) * 5, 25);
    suggestions.add(PasswordSuggestion.LENGTH);
  } else {
    score += Math.min((password.length - 10) * 5, 25);
  }

  return {
    score,
    suggestions,
    warnings,
    hints,
  };
}

function analyzePasswordCharset(password: string): PartialAnalysis {
  let score = 0;
  const { suggestions, warnings, hints } = initPartialAnalysis();

  // check for invalid or very insecure passwords
  if (INCLUDES_COMMONLY_REJECTED.test(password)) {
    score = -Infinity;
    warnings.add(PasswordWarnings.INVALID_CHARS);
  } else if (NUMBERS_ONLY.test(password)) {
    score = -Infinity;
    warnings.add(PasswordWarnings.ONLY_NUMBERS);
  }

  // check for potentially rejected chars
  if (!ONLY_BASIC_VALID_CHARS.test(password)) {
    hints.add(PasswordHint.SPECIAL_CHARACTERS);
  }

  // score the password and add suggestions
  if (!INCLUDES_NUMBERS.test(password)) {
    score -= 10;
    suggestions.add(PasswordSuggestion.NUMBERS);
  }

  if (!INCLUDES_LOWERCASE.test(password)) {
    score -= 10;
    suggestions.add(PasswordSuggestion.LOWERCASE);
  }

  if (!INCLUDES_UPPERCASE.test(password)) {
    score -= 10;
    suggestions.add(PasswordSuggestion.UPPERCASE);
  }

  if (!INCLUDES_SPECIAL.test(password)) {
    score -= 25;
    suggestions.add(PasswordSuggestion.SPECIAL_CHARACTERS);
  }

  return {
    score,
    suggestions,
    warnings,
    hints,
  };
}

function initPartialAnalysis(initialScore = 0): PartialAnalysis {
  return {
    score: initialScore,
    suggestions: new Set<PasswordSuggestion>(),
    warnings: new Set<PasswordWarnings>(),
    hints: new Set<PasswordHint>(),
  };
}
