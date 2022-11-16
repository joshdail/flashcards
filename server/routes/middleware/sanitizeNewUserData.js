const createError = require("http-errors")

// IMPORTANT: This middleware sanitizes the user input BEFORE the password is hashed
// Make sure to hash the password AFTER this middleware

const sanitizeNewUserData = function (req, res, next) {
  const username =
    typeof req.body.username === "string" && req.body.username.trim().length > 7
      ? req.body.username.trim()
      : null

  const password =
    typeof req.body.password === "string" && req.body.password.trim().length > 7
      ? req.body.password.trim()
      : null

  if (!username || !password) {
    return next(
      createError(
        400,
        "Missing or invalid username or password when creating new user"
      )
    )
  }

  req.username = username
  req.password = password
  delete req.body.password
  next()
}

module.exports = sanitizeNewUserData
