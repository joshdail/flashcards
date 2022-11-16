const Token = require("../../schemas/token.js")
const createError = require("http-errors")

const deleteToken = async function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"]
    const tokenId = authHeader && authHeader.split(" ")[1]

    await Token.deleteOne({
      tokenId: tokenId
    })
    next()
  } catch (err) {
    console.debug(err)
    return next(
      createError(
        403,
        "Either token does not exist or something is wrong in the request header."
      )
    )
  }
}

module.exports = deleteToken
