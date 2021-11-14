const { Transform } = require("stream");
const { cipherMessage } = require("../utils");
const { cipher } = require("../constants");

class AtbashTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = cipherMessage(
        chunk.toString().trim(),
        cipher.atbash
      );
      this.push(resultString);
      callback();
    } catch (err) {
      process.stderr.write(err.message);
    }
  }
}

module.exports = {
  AtbashTransform,
};
