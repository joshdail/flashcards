const User = require("../../schemas/user")
const createError = require("http-errors")

const saveNewUser = async function (req, res, next) {
  const user = new User({
    username: req.username,
    hashedPassword: req.hashedPassword,
    salt: req.salt,
    decks: []
  })

  const alreadyExists = await User.findOne({
    username: user.username
  })
  if (alreadyExists) {
    return next(createError(400, "User already exists"))
  }

  try {
    await user.save()
    req.result = {
      username: user.username
    }
    next()
  } catch (err) {
    return next(createError(500, "Error saving new user"))
  }
}

module.exports = saveNewUser
