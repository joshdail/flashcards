const createRandomString = require("./createRandomString.js")
const Token = require("../../schemas/token.js")
const createError = require("http-errors")

const createNewToken = async function (req, res, next) {
  try {
    const newTokenId = createRandomString(32)
    const token = new Token({
      tokenId: newTokenId,
      userId: req.data._id.toString()
    })
    req.tokenId = newTokenId
    await token.save()
    next()
  } catch (err) {
    return next(createError(500, "Error generating token"))
  }
}

module.exports = createNewToken
