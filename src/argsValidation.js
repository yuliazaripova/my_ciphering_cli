const fs = require('fs');
const { ConfigRequiredError, ArgsDuplicatedError, ConfigNotValidError, FileMissingError } = require("./error/ValidationError")
const { args } = require ("./constants")

const grab = (flag) => {
    let index = process.argv.indexOf(flag) + 1;
    if (index === 0) return undefined
    return process.argv[index];
};

const validateArgCount = (arg) => {
    return process.argv.filter(i => i === arg).length > 1
}

const validateConfig = (conf) => {
    const arr = conf.split("-")
    return arr.every(matchCipher)
}

const matchCipher = (i) => {
    return (
        i === "C0" || i === "C1" || i === "R0" || i === "R1" || i === "A"
    )
}

const validateInput = () => {
    const cipher = grab(args.config)
    const input = grab(args.input)
    const output = grab(args.output)
    if (!cipher) {
        throw new ConfigRequiredError()
    }
    if (!validateConfig(cipher)) {
        throw new ConfigNotValidError()
    }
    const countNotValid = [args.config, args.input, args.output].some(validateArgCount)
   
    if (countNotValid) {
        throw new ArgsDuplicatedError()
    }
    
   return { cipher, input, output }
    
}
const checkFileExists = (file) => {
    if (!fs.existsSync(file)) {
      throw new FileMissingError(file)
    }
  }

module.exports = {
    validateInput,
    checkFileExists
}
