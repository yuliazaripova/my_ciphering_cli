const { Transform } = require("stream");
const { cipherMessage } = require("../utils");
const { cipher } = require("../constants");

class ROT8Transform extends Transform {
  constructor(flag) {
    super();
    this.flag = flag;
    this.text = null;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = cipherMessage(
        chunk.toString().trim(),
        cipher.caesar,
        this.flag,
        8
      );
      this.push(resultString);
      callback();
    } catch (err) {
      process.stderr.write(err.message);
    }
  }
}

module.exports = {
  ROT8Transform,
};
