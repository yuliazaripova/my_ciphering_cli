const { CeaserTransform } = require("../streams/CeaserTransform");
const { AtbashTransform } = require("../streams/AtbashTransform");
const { ROT8Transform } = require("../streams/ROT8Transform");

const createStreams = (config) => {
  const arr = config.split("-");
  return arr.map((i) => {
    if (i[0] === "C") {
      return new CeaserTransform(i[1]);
    }
    if (i[0] === "R") {
      return new ROT8Transform(i[1]);
    }
    if (i === "A") {
      return new AtbashTransform();
    }
  });
};

module.exports = {
  createStreams,
};
