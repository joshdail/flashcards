const mongoose = require("mongoose")

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true1
  },
  flashcards: {
    type: [String],
    required: false
  }
})

const Deck = mongoose.model("Deck", deckSchema)

module.exports = Deck
