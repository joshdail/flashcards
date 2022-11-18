const User = require("../../schemas/user.js")
const Deck = require("../../schemas/deck")
const Flashcard = require("../../schemas/flashcard")
const createError = require("http-errors")

const deleteUser = async function (req, res, next) {
  try {
    // Delete all flashcards and decks tied to the user
    await Flashcard.deleteMany({
      userId: req.user._id.toString()
    })
    await Deck.deleteMany({
      userId: req.user._id.toString()
    })
    await User.deleteOne({
      username: req.user.username
    })
    next()
  } catch (e) {
    return next(createError(500, "Error deleting user"))
  }
}

module.exports = deleteUser
