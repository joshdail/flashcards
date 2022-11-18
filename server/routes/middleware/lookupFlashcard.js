const createError = require("http-errors")

const lookupFlashcard = async function (req, res, next) {
  try {
    // TODO: Look up flashcard
  } catch (err) {
    return next(createError(500, "Error looking up flashcard from database"))
  }
}

module.exports = lookupFlashcard
