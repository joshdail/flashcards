const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  decks: {
    type: [String],
    required: false
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User
