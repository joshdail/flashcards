const createError = require("http-errors")

const updateDeck = async function (req, res, next) {
  try {
    req.deck.name = req.name
    await req.deck.save()
    req.result.name = req.deck.name
    next()
  } catch (err) {
    return next(createError(500, "Error updating deck to database"))
  }
}

module.exports = updateDeck
