module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/setup-jest.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!ol).+\.js$"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$"
    }
  },
  modulePaths: [
    "<rootDir>"
  ],
  collectCoverage: true,
  coverageReporters: ["html", "text"]
};
