const Token = require("../../schemas/token.js")
const createError = require("http-errors")

// Note: This function does not verify that the token matches the user.
// This function is only checking that the token itself exists.

const authenticateToken = async function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"]
    const tokenId = authHeader && authHeader.split(" ")[1]

    const token = await Token.findOne({
      tokenId: tokenId
    })
    req.token = token
    next()
  } catch (err) {
    return next(
      createError(
        403,
        "Either token does not exist or something is wrong in the request header."
      )
    )
  }
}

module.exports = authenticateToken
