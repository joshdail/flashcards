const User = require("../../schemas/user.js")
const createError = require("http-errors")

const deleteUser = async function (req, res, next) {
  try {
    await User.deleteOne({
      username: req.params.username
    })
    next()
  } catch (e) {
    return next(createError(500, "Error deleting user"))
  }
}

module.exports = deleteUser
