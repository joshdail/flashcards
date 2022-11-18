const Flashcard = require("../../schemas/flashcard")
const createError = require("http-errors")

const saveNewFlashcard = async function (req, res, next) {
  try {
    const flaschard = new Flashcard({
      question: req.question,
      answer: req.answer,
      deckId: req.deck._id.toString(),
      userId: req.user._id.toString()
    })
  } catch (err) {
    return next(createError(500, "Error saving flashcard to database"))
  }
}

module.exports = saveNewFlashcard
