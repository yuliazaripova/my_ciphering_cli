const args = {
  config: "-c",
  input: "-i",
  output: "-o",
};

const cipher = {
  caesar: "C",
  atbash: "A",
  ROT8: "R",
};

const operation = {
  encode: "1",
  decode: "0",
};

module.exports = {
  args,
  cipher,
  operation,
};
