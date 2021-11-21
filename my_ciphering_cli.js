const { pipeline } = require("stream");
const { exit } = require("process");
const { ReadableStream } = require("./src/streams/ReadableStream");
const { WritableStream } = require("./src/streams/WritableStream");
const { createStreams } = require("./src/entities/createStreams");
const { validateInput, checkFileExists } = require("./src/argsValidation");

let cipher;
let input;
let output;

const main = () => {
  try {
    ({ cipher, input, output } = validateInput());
    Boolean(input) && checkFileExists(input);
    Boolean(output) && checkFileExists(output);
  } catch (e) {
    process.stderr.write(`Error: "${e.message}"`);
    exit(1);
  }
};
main();
const streams = createStreams(cipher);

const rs = !input ? process.stdin : new ReadableStream(input);
const ws = !output ? process.stdout : new WritableStream(output);

pipeline(rs, ...streams, ws, (err) => {
  if (err) {
    process.stderr.write(`Error: "${err.message}"`);
    exit(1);
  } else {
    exit();
  }
});

module.exports = {
  main,
};
