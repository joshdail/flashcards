const mongoose = require("mongoose")

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  deckId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
