const {
  getFirstAndLastCodes,
  cipherMessage,
  cipherLetter,
} = require("../utils");

describe("cipherLetter", () => {
  it("should return a letter with a shift to right for ceasar type to encode", () => {
    const res = cipherLetter("a", "C", "1", 1);
    expect(res).toEqual("b");
  });
  it("should return a letter with a shift to left for ceasar type to decode", () => {
    const res = cipherLetter("a", "C", "0", 1);
    expect(res).toEqual("z");
  });
  it("should return a opposite letter for atbash type", () => {
    const res = cipherLetter("a", "A");
    expect(res).toEqual("z");
  });
});
describe("getFirstAndLastCodes", () => {
  it("should return an object with first and last code of alphabet for lowercase letter", () => {
    const res = getFirstAndLastCodes("a");
    expect(res).toEqual({ firstCode: 97, lastCode: 122 });
  });
  it("should return an object with first and last code of alphabet for uppercase letter", () => {
    const res = getFirstAndLastCodes("F");
    expect(res).toEqual({ firstCode: 65, lastCode: 90 });
  });
});
describe("cipherMessage", () => {
  it("should return string with a shift to right for ceasar type", () => {
    const res = cipherMessage("abc", "C", "1", 1);
    expect(res).toEqual("bcd");
  });
  it("should return string with a shift to left for ceasar type", () => {
    const res = cipherMessage("abc", "C", "0", 1);
    expect(res).toEqual("zab");
  });
  it("should modify only english alphabet chars", () => {
    const res = cipherMessage("a_b_! c >)", "C", "0", 1);
    expect(res).toEqual("z_a_! b >)");
  });
});
