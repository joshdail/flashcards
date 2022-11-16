const crypto = require("crypto")
const createRandomString = require("./createRandomString.js")

const hashNewPassword = function (req, res, next) {
  const salt = createRandomString(32)
  const hashedPassword = crypto
    .createHmac("sha512", salt)
    .update(req.password)
    .digest("hex")
  req.hashedPassword = hashedPassword
  req.salt = salt
  delete req.password
  next()
}

module.exports = hashNewPassword
