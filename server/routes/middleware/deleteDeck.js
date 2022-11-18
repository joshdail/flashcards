const createError = require("http-errors")
const Deck = require("../../schemas/deck")
const Flashcard = require("../../schemas/flashcard")

const deleteDeck = async function (req, res, next) {
  try {
    // Delete all flashcards from the deck
    await Flashcard.deleteMany({
      deckId: req.deck._id.toString()
    })
    await Deck.deleteOne({
      name: req.deck.name
    })
    // Remove the reference to the deck name from the user
    req.user.decks.pull(req.deck.name)
    await user.save()
    next()
  } catch (err) {
    return next(createError(500, "Error deleting deck from database"))
  }
}

module.exports = deleteDeck
