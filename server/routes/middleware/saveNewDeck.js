const createError = require("http-errors")
const Deck = require("../../schemas/deck")

const saveNewDeck = async function (req, res, next) {
  try {
    const user = await User.findOne({
      _id: req.token.userId
    })
    if (!user) {
      return next(
        createError(
          403,
          "Error validating token. Check the authorization headers to make sure you have a valid token for the correct user"
        )
      )
    }
    const deck = new Deck({
      name: req.name,
      userId: user._id.toString(),
      flashcards: []
    })
    await deck.save()
    user.decks.addToSet(deck.name)
    await user.save()
    req.result = {
      name: deck.name
    }
    next()
  } catch (err) {
    return next(createError(500, "Error saving new deck to database"))
  }
}

module.exports = saveNewDeck
