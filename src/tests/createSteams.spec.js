const { createStreams } = require("../entities/createStreams")
const { CeaserTransform } = require("../streams/CeaserTransform")
const { ROT8Transform } = require("../streams/ROT8Transform")
const { AtbashTransform } = require("../streams/AtbashTransform")

jest.mock("../streams/CeaserTransform")
jest.mock("../streams/ROT8Transform")
jest.mock("../streams/AtbashTransform")

const config = "C1-A-R0"

describe("createStreams", () => {
    const res = createStreams(config)
    it("should call stream constructor of specific chipher item", () => {
        expect(CeaserTransform).toHaveBeenCalledTimes(1)
        expect(ROT8Transform).toHaveBeenCalledTimes(1)
        expect(AtbashTransform).toHaveBeenCalledTimes(1)
    })
    it("result length should be equal count of chipher elements", () => {
        expect(res.length).toEqual(3)
    })
})
