const createError = require("http-errors")

const sanitizeNewCheckData = function (req, res, next) {
  const name =
    typeof req.body.name === "string" && req.body.name.trim().length > 0
      ? req.body.name.trim()
      : null

  if (!name) {
    return next(createError(400, "No name was given for the new deck"))
  }
  req.name = name
  next()
}

module.exports = sanitizeNewCheckData
