const { CeaserTransform } = require("./src/streams/CeaserTransform")
const { AtbashTransform } = require("./src/streams/AtbashTransform")
const { ROT8Transform } = require("./src/streams/ROT8Transform")

const createStreams = (config) => {
    const arr = config.split("-")
    return arr.map((i) => {
        if (i[0] === "C") {
          return new CeaserTransform(i[1])
        } else if (i[0] === "R") {
          return new ROT8Transform(i[1])
        } else if ((i === "A")) {
          return new AtbashTransform()
        }
    })
   }