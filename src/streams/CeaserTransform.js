const { Transform } = require("stream");
const { cipherMessage } = require("../utils");
const { cipher } = require("../constants");

class CeaserTransform extends Transform {
  constructor(operation) {
    super();
    this.operation = operation;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = cipherMessage(
        chunk.toString().trim(),
        cipher.caesar,
        this.operation,
        1
      );
      this.push(resultString);
      callback();
    } catch (err) {
      process.stderr.write(err.message);
    }
  }
}

module.exports = {
  CeaserTransform,
};
