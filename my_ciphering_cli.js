const { pipeline } = require('stream');
const { exit } = require("process");
const { ReadableStream } = require("./src/streams/ReadableStream")
const { WritableStream } = require("./src/streams/WritableStream")
const { createStreams } = require("./src/entities/createStreams")
const { ValidationError } = require("./src/error/ValidationError")
const { validateInput, checkFileExists} = require("./src/argsValidation");

let cipher, input, output

try {
  ({ cipher, input, output } = validateInput())
  Boolean(input) && checkFileExists(input)
  Boolean(output) && checkFileExists(output)

} catch (e) {
  process.stderr.write(`Error: "${e.message}"`)
  exit(1)
}



const res = createStreams(cipher)

const rs =  !Boolean(input) ? process.stdin : new ReadableStream(input)
const ws = !Boolean(output) ? process.stdout : new WritableStream(output)

pipeline(rs, ...res, ws, err => {
    if (err) {
      process.stderr.write(`Error: "${err.message}"`)
      exit(1)
    } else {
      exit()
    }
  });
