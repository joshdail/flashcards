const createError = require("http-errors")
const Deck = require("../../schemas/deck")
const User = require("../../schemas/user")

const lookupDeck = async function (req, res, next) {
  try {
    const user = await User.findOne({
      _id: req.token.userId
    })
    if (!user) {
      return next(createError(403, "Invalid token submitted"))
    }
    if (user.decks.indexOf(req.params.name) === -1) {
      return next(
        createError(404, "No deck with this name exists for this user")
      )
    }
    // Need to match both the name and the userId, since different users
    // can have their own decks with the same names
    const deck = await Deck.findOne({
      name: req.params.name,
      userId: user._id.toString()
    })
    req.user = user
    req.deck = deck
    req.result = {
      name: deck.name,
      flashcards: deck.flashcards
    }
    next()
  } catch (err) {
    return next(createError(500, "Error looking up deck from database"))
  }
}

module.exports = lookupDeck
