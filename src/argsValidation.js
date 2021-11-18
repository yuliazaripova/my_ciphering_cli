const fs = require("fs");
const {
  ConfigRequiredError,
  ArgsDuplicatedError,
  ConfigNotValidError,
  FileMissingError,
} = require("./errors/ValidationError");
const { args, fullAgs } = require("./constants");


const grab = (flag) => {
  const index = process.argv.indexOf(flag) + 1;
  if (index === 0) return undefined;
  return process.argv[index];
};

const validateArgCount = ({arg1, arg2}) => {
  return (process.argv.filter((i) => i === arg1).length + process.argv.filter((i) => i === arg2).length) > 1;
};

const matchCipher = (i) => {
  return i === "C0" || i === "C1" || i === "R0" || i === "R1" || i === "A";
};

const validateConfig = (conf) => {
  const arr = conf.split("-");
  return arr.every(matchCipher);
};

const validateInput = () => {
  const countNotValid = [
      { arg1: args.config, arg2: fullAgs.config }, 
      { arg1: args.input, arg2: fullAgs.input }, 
      { arg1: args.output, arg2: fullAgs.output }
    ].some(
    validateArgCount
  );

  if (countNotValid) {
    throw new ArgsDuplicatedError();
  }
  const cipher = grab(args.config) ||  grab(fullAgs.config);
  const input = grab(args.input) || grab(fullAgs.input);
  const output = grab(args.output) || grab(fullAgs.output);

  if (!cipher) {
    throw new ConfigRequiredError();
  }
  if (!validateConfig(cipher)) {
    throw new ConfigNotValidError();
  }

  return { cipher, input, output };
};

const checkFileExists = (file) => {
  if (!fs.existsSync(file)) {
    throw new FileMissingError(file);
  }
};

module.exports = {
  validateInput,
  checkFileExists,
  validateArgCount,
  matchCipher,
  validateConfig
};
