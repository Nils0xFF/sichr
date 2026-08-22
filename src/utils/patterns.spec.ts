import {
  NUMBERS_ONLY,
  INCLUDES_LOWERCASE,
  INCLUDES_UPPERCASE,
  INCLUDES_NUMBERS,
  INCLUDES_SPECIAL,
  ONLY_VALID_CHARS,
  INCLUDES_COMMONLY_REJECTED,
  ONLY_BASIC_VALID_CHARS,
} from "./patterns.ts";

describe("basic password patterns", () => {
  it("NUMBERS_ONLY does match only numbers string", () => {
    expect(NUMBERS_ONLY.test("1234")).toBeTruthy();
  });
  it("NUMBERS_ONLY does not match other characters", () => {
    expect(NUMBERS_ONLY.test("abcd")).toBeFalsy();
  });
  it("INCLUDES_LOWERCASE does match string containing lowercase", () => {
    expect(INCLUDES_LOWERCASE.test("abc567")).toBeTruthy();
    expect(INCLUDES_LOWERCASE.test("###LoWeRCase")).toBeTruthy();
  });
  it("INCLUDES_LOWERCASE does not match string not containing lowercase", () => {
    expect(INCLUDES_LOWERCASE.test("ABC4565")).toBeFalsy();
    expect(INCLUDES_LOWERCASE.test("###UPPERCASE")).toBeFalsy();
  });

  it("INCLUDES_UPPERCASE does match string not containing lowercase", () => {
    expect(INCLUDES_UPPERCASE.test("ABC4565")).toBeTruthy();
    expect(INCLUDES_UPPERCASE.test("###UPPERCASE")).toBeTruthy();
  });
  it("INCLUDES_UPPERCASE does not match string containing lowercase", () => {
    expect(INCLUDES_UPPERCASE.test("abc567")).toBeFalsy();
    expect(INCLUDES_UPPERCASE.test("###lowercase")).toBeFalsy();
  });
  it("INCLUDES_NUMBERS does match string containing numbers", () => {
    expect(INCLUDES_NUMBERS.test("abc1234")).toBeTruthy();
    expect(INCLUDES_NUMBERS.test("1235")).toBeTruthy();
  });
  it("INCLUDES_NUMBERS does not match string containing numbers", () => {
    expect(INCLUDES_NUMBERS.test("abcONETWOTHREE")).toBeFalsy();
    expect(INCLUDES_NUMBERS.test("#%pos")).toBeFalsy();
  });
});

describe("special character password patterns", () => {
  const basicSpecialCharacters = new Set("!@#$-_".split(""));
  const supportedSpecialCharacters = new Set(
    "!@#$%^&*()-_=+[]{}|;:,./?~`".split(""),
  );
  const commonlyRejectedCharacters = new Set("'\"\\<> ".split(""));

  supportedSpecialCharacters.forEach((c) => {
    it("INCLUDES_SPECIAL does match string containing " + c, () => {
      expect(INCLUDES_SPECIAL.test("stringContaining" + c)).toBeTruthy();
    });
  });

  commonlyRejectedCharacters.forEach((c) => {
    it("INCLUDES_SPECIAL does not match string containing " + c, () => {
      expect(INCLUDES_SPECIAL.test("stringContaining" + c)).toBeFalsy();
    });
  });

  commonlyRejectedCharacters.forEach((c) => {
    it("INCLUDES_COMMONLY_REJECTED does match string containing " + c, () => {
      expect(INCLUDES_COMMONLY_REJECTED.test(c)).toBeTruthy();
    });
  });

  supportedSpecialCharacters.forEach((c) => {
    it(
      "INCLUDES_COMMONLY_REJECTED does not match string containing " + c,
      () => {
        expect(INCLUDES_COMMONLY_REJECTED.test(c)).toBeFalsy();
      },
    );
  });

  it("ONLY_BASIC_VALID_CHARS does match normal strings", () => {
    expect(ONLY_BASIC_VALID_CHARS.test("xyz")).toBeTruthy();
    expect(ONLY_BASIC_VALID_CHARS.test("XYZ")).toBeTruthy();
    expect(ONLY_BASIC_VALID_CHARS.test("123")).toBeTruthy();
    expect(ONLY_BASIC_VALID_CHARS.test("abcXYZ123")).toBeTruthy();
  });

  basicSpecialCharacters.forEach((c) => {
    it("ONLY_BASIC_VALID_CHARS does match string containing " + c, () => {
      expect(ONLY_BASIC_VALID_CHARS.test("xyz" + c)).toBeTruthy();
      expect(ONLY_BASIC_VALID_CHARS.test("XYZ" + c)).toBeTruthy();
      expect(ONLY_BASIC_VALID_CHARS.test("123" + c)).toBeTruthy();
      expect(ONLY_BASIC_VALID_CHARS.test("abcXYZ123" + c)).toBeTruthy();
    });
  });

  supportedSpecialCharacters.difference(basicSpecialCharacters).forEach((c) => {
    it("ONLY_BASIC_VALID_CHARS does not match string containing " + c, () => {
      expect(ONLY_BASIC_VALID_CHARS.test("xyz" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("XYZ" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("123" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("abcXYZ123" + c)).toBeFalsy();
    });
  });

  commonlyRejectedCharacters.forEach((c) => {
    it("ONLY_BASIC_VALID_CHARS does not match string containing " + c, () => {
      expect(ONLY_BASIC_VALID_CHARS.test("xyz" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("XYZ" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("123" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("abcXYZ123" + c)).toBeFalsy();
    });
  });

  it("ONLY_VALID_CHARS does match normal strings", () => {
    expect(ONLY_VALID_CHARS.test("xyz")).toBeTruthy();
    expect(ONLY_VALID_CHARS.test("XYZ")).toBeTruthy();
    expect(ONLY_VALID_CHARS.test("123")).toBeTruthy();
    expect(ONLY_VALID_CHARS.test("abcXYZ123")).toBeTruthy();
  });

  basicSpecialCharacters.forEach((c) => {
    it("ONLY_VALID_CHARS does match string containing " + c, () => {
      expect(ONLY_VALID_CHARS.test("xyz" + c)).toBeTruthy();
      expect(ONLY_VALID_CHARS.test("XYZ" + c)).toBeTruthy();
      expect(ONLY_VALID_CHARS.test("123" + c)).toBeTruthy();
      expect(ONLY_VALID_CHARS.test("abcXYZ123" + c)).toBeTruthy();
    });
  });

  supportedSpecialCharacters.difference(basicSpecialCharacters).forEach((c) => {
    it("ONLY_VALID_CHARS does match string containing " + c, () => {
      expect(ONLY_VALID_CHARS.test("xyz" + c)).toBeTruthy();
      expect(ONLY_VALID_CHARS.test("XYZ" + c)).toBeTruthy();
      expect(ONLY_VALID_CHARS.test("123" + c)).toBeTruthy();
      expect(ONLY_VALID_CHARS.test("abcXYZ123" + c)).toBeTruthy();
    });
  });

  commonlyRejectedCharacters.forEach((c) => {
    it("ONLY_BASIC_VALID_CHARS does not match string containing " + c, () => {
      expect(ONLY_BASIC_VALID_CHARS.test("xyz" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("XYZ" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("123" + c)).toBeFalsy();
      expect(ONLY_BASIC_VALID_CHARS.test("abcXYZ123" + c)).toBeFalsy();
    });
  });
});
