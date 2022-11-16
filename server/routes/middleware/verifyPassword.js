const crypto = require("crypto")
const createError = require("http-errors")
const User = require("../../schemas/user")

const verifyPassword = async function (req, res, next) {
  try {
    const data = await User.findOne({
      username: req.body.username
    })
    const hashedPassword = crypto
      .createHmac("sha512", data.salt)
      .update(req.body.password)
      .digest("hex")

    if (hashedPassword !== data.hashedPassword) {
      return next(createError(401, "Incorrect password"))
    }

    req.data = data
    next()
  } catch (err) {
    return next(createError(404, "User not found"))
  }
}

module.exports = verifyPassword
