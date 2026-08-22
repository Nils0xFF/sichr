import { analyzePassword } from "./analyze-password.ts";
import {
  PasswordHint,
  PasswordSuggestion,
  PasswordWarnings,
} from "./analyze.types.ts";

describe("password analyzer warnings", () => {
  it("password analyzer creates warning for short passwords", () => {
    const result = analyzePassword("abc");
    expect(result.warnings).toContain(PasswordWarnings.TOO_SHORT);
  });

  it("password analyzer creates warning for only number passwords", () => {
    const result = analyzePassword("12345");
    expect(result.warnings).toContain(PasswordWarnings.ONLY_NUMBERS);
  });

  it("password analyzer creates warning for rejected characters passwords", () => {
    const result = analyzePassword('12345"');
    expect(result.warnings).toContain(PasswordWarnings.INVALID_CHARS);
  });
});

describe("password analyzer hints", () => {
  it("password analyzer creates hint for possibly rejected passwords", () => {
    const result = analyzePassword("abc454~");
    expect(result.hints).toContain(PasswordHint.SPECIAL_CHARACTERS);
  });
});

describe("password analyzer suggestions", () => {
  it("password analyzer creates suggestion for short passwords", () => {
    const result = analyzePassword("hLoMZ");
    expect(result.warnings.entries).toHaveLength(0);
    expect(result.suggestions).toContain(PasswordSuggestion.LENGTH);
  });

  it("password analyzer creates suggestion for no number passwords", () => {
    const result = analyzePassword("hLoMZ");
    expect(result.warnings.entries).toHaveLength(0);
    expect(result.suggestions).toContain(PasswordSuggestion.NUMBERS);
  });

  it("password analyzer creates suggestion for no lowercase passwords", () => {
    const result = analyzePassword("59HJF");
    expect(result.warnings.entries).toHaveLength(0);
    expect(result.suggestions).toContain(PasswordSuggestion.LOWERCASE);
  });

  it("password analyzer creates suggestion for no uppercase passwords", () => {
    const result = analyzePassword("12abc");
    expect(result.warnings.entries).toHaveLength(0);
    expect(result.suggestions).toContain(PasswordSuggestion.UPPERCASE);
  });

  it("password analyzer creates suggestion for no special character passwords", () => {
    const result = analyzePassword("12ABC");
    expect(result.warnings.entries).toHaveLength(0);
    expect(result.suggestions).toContain(PasswordSuggestion.SPECIAL_CHARACTERS);
  });
});

describe("password analyzer score", () => {
  // TODO: implement more test cases
  it("rates a perfect password with 100 score", () => {
    const result = analyzePassword("uz#_da2G%jh_.+");
    expect(result.score).toBe(100);
  });
});
