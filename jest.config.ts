import { createDefaultEsmPreset, type JestConfigWithTsJest } from "ts-jest";

const presetConfig = createDefaultEsmPreset({
  tsconfig: "tsconfig.test.json",
});

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default jestConfig;
