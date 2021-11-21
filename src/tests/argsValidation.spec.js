const {   ConfigRequiredError,
  ArgsDuplicatedError,
  ConfigNotValidError,
  FileMissingError, } = require("../errors/ValidationError");
const { validateArgCount, validateInput, validateConfig, matchCipher, checkFileExists } = require("../argsValidation")

afterEach(() => {
  process.argv = []
});

const DUPLICATED_ARGS_INPUT = '-c C1-C1-A-R0 -c C0';
const INPUT_WITHOUT_CONFIG = '-i input.txt -o output.txt';
const INPUT_WITH_UNEXISTING_FILE = '-c C1-C1-A-R0 -i input.tt';
const INPUT_WITH_INVALID_CONFIG = '-c C1-C1-A-R';

describe("validateArgCount", () => {
  it("should return true if any arg is duplicated", () => {
    process.argv.push('node', 'my_ciphering_cli', ...DUPLICATED_ARGS_INPUT.split(" "));
    expect(validateArgCount({ arg1: "-c", arg2: "--config" })).toBeTruthy()
  })
  it("should return false if there are no duplicated args", () => {
    process.argv.push('node', 'my_ciphering_cli', '-c', "A");
    expect(validateArgCount({ arg1: "-c", arg2: "--config" })).toBeFalsy()
  })
})

describe("validateArgCount", () => {
  it('should throw ArgsDuplicatedError if any arg are duplicated', () => {
    process.argv.push('node', 'my_ciphering_cli', ...DUPLICATED_ARGS_INPUT.split(" "));
    expect(() => validateInput()).toThrow(new ArgsDuplicatedError());
  });
  it('should throw ConfigRequiredError if any arg are duplicated', () => {
    process.argv.push('node', 'my_ciphering_cli', ...INPUT_WITHOUT_CONFIG.split(" "));
      expect(() => validateInput()).toThrow(new ConfigRequiredError());
  });
  it('should throw ConfigNotValidError if any arg are duplicated', () => {
    process.argv.push('node', 'my_ciphering_cli', ...INPUT_WITH_INVALID_CONFIG.split(" "));
      expect(() => validateInput()).toThrow(new ConfigNotValidError());
  });
})

describe("matchCipher", () => {
  it("should return true for config element that matches pattern {XY(-)}n", () => {
    expect(matchCipher("A")).toBeTruthy()
    expect(matchCipher("C0")).toBeTruthy()
    expect(matchCipher("C1")).toBeTruthy()
  })
  it("should return false for config element that doesn't match pattern {XY(-)}n", () => {
    expect(matchCipher("A1")).toBeFalsy()
    expect(matchCipher("C4")).toBeFalsy()
    expect(matchCipher("d")).toBeFalsy()
  })
})

describe("validateConfig", () => {
  it("should return true for config that matches pattern {XY(-)}n", () => {
    expect(validateConfig("C1-C1-A-R0")).toBeTruthy()
  })
  it("should return true for config that that doesn't match pattern {XY(-)}n", () => {
    expect(validateConfig("C1-C1-A2-R0")).toBeFalsy()
  })
})

// const str1 = ` -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"`
// jest.mock('fs');
// describe("validateArgCount", () => {
//   it("should return true if any arg is duplicated", () => {
//      process.argv.push('node', 'my_ciphering_cli', ...str1.split(" "));
//     // fs.readFileSync.mockImplementation(() => {});
//     fs.readFileSync.mockResolvedValue(JSON.stringify({"some" : "data"}))
//     expect(() => checkFileExists("./input.js")).toThrow(new FileMissingError("./input.js"))
//   })
// })