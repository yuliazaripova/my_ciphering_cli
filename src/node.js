const grab = (flag) => {
    let index = process.argv.indexOf(flag) + 1;
    return process.argv[index];
};



const cipher = grab(args.config)
const input = grab(args.input)
const output = grab(args.output)

const validateArgCount = (arg) => {
    return process.argv.filter(i => i === arg).length > 1
}
const validateConfig = (conf) => {
    const arr = conf.split("-")
}
const message = process.argv
//console.log(validateArgCount(args.config))
///console.log({cipher, input, output})

