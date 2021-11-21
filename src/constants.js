const args = {
  config: "-c",
  input: "-i",
  output: "-o",
};

const fullAgs = {
  config: "--config",
  input: "--input",
  output: "--output",
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
  fullAgs,
  cipher,
  operation,
};
