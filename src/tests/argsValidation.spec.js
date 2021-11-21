const fs = require("fs");
const {
  ConfigRequiredError,
  ArgsDuplicatedError,
  ConfigNotValidError,
  FileMissingError,
} = require("../errors/ValidationError");
const {
  validateArgCount,
  validateInput,
  validateConfig,
  matchCipher,
  checkFileExists,
} = require("../argsValidation");

afterEach(() => {
  process.argv = [];
});

const DUPLICATED_ARGS = "-c C1-C1-A-R0 -c C0";
const WITHOUT_CONFIG = "-i input.txt -o output.txt";
const INPUT_WITH_UNEXISTING_FILE = "-c C1-C1-A-R0 -i input.tt";
const OUTPUT_WITH_UNEXISTING_FILE = "-c C1-C1-A-R0 -o output.tt";
const INVALID_CONFIG = "-c C1-C1-A-R";

jest.mock("fs");

describe("checkFileExists", () => {
  it("should throw FileMissingError if input doesn't exist", () => {
    process.argv.push(
      "node",
      "my_ciphering_cli",
      ...INPUT_WITH_UNEXISTING_FILE.split(" ")
    );
    const input = process.argv[process.argv.indexOf("-i") + 1];
    fs.existsSync.mockReturnValue(false);
    expect(() => checkFileExists(input)).toThrow(new FileMissingError(input));
  });
  it("should throw FileMissingError if output doesn't exist", () => {
    process.argv.push(
      "node",
      "my_ciphering_cli",
      ...OUTPUT_WITH_UNEXISTING_FILE.split(" ")
    );
    const output = process.argv[process.argv.indexOf("-o") + 1];
    fs.existsSync.mockReturnValue(false);
    expect(() => checkFileExists(output)).toThrow(new FileMissingError(output));
  });
});

describe("validateArgCount", () => {
  it("should return true if any arg is duplicated", () => {
    process.argv.push(
      "node",
      "my_ciphering_cli",
      ...DUPLICATED_ARGS.split(" ")
    );
    expect(validateArgCount({ arg1: "-c", arg2: "--config" })).toBeTruthy();
  });
  it("should return false if there are no duplicated args", () => {
    process.argv.push("node", "my_ciphering_cli", "-c", "A");
    expect(validateArgCount({ arg1: "-c", arg2: "--config" })).toBeFalsy();
  });
});

describe("validateArgCount", () => {
  it("should throw ArgsDuplicatedError if any arg are duplicated", () => {
    process.argv.push(
      "node",
      "my_ciphering_cli",
      ...DUPLICATED_ARGS.split(" ")
    );
    expect(() => validateInput()).toThrow(new ArgsDuplicatedError());
  });
  it("should throw ConfigRequiredError if any arg are duplicated", () => {
    process.argv.push("node", "my_ciphering_cli", ...WITHOUT_CONFIG.split(" "));
    expect(() => validateInput()).toThrow(new ConfigRequiredError());
  });
  it("should throw ConfigNotValidError if config is not valid", () => {
    process.argv.push("node", "my_ciphering_cli", ...INVALID_CONFIG.split(" "));
    expect(() => validateInput()).toThrow(new ConfigNotValidError());
  });
});

describe("matchCipher", () => {
  it("should return true for config element that matches pattern {XY(-)}n", () => {
    expect(matchCipher("A")).toBeTruthy();
    expect(matchCipher("C0")).toBeTruthy();
    expect(matchCipher("C1")).toBeTruthy();
  });
  it("should return false for config element that doesn't match pattern {XY(-)}n", () => {
    expect(matchCipher("A1")).toBeFalsy();
    expect(matchCipher("C4")).toBeFalsy();
    expect(matchCipher("d")).toBeFalsy();
  });
});

describe("validateConfig", () => {
  it("should return true for config that matches pattern {XY(-)}n", () => {
    expect(validateConfig("C1-C1-A-R0")).toBeTruthy();
  });
  it("should return true for config that doesn't match pattern {XY(-)}n", () => {
    expect(validateConfig("C1-C1-A2-R0")).toBeFalsy();
  });
});
