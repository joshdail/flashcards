require("dotenv").config()

const express = require("express")
const app = express()
const port = 3000

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const users = require("./routes/users")
const tokens = require("./routes/tokens")
const decks = require("./routes/decks")

const Token = require("./schemas/token.js")

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use(bodyParser.json())

app.use("/users", users)
app.use("/tokens", tokens)
app.use("/decks", decks)

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

mongoose.connect(process.env.CONNECTION_STRING)

process.on("SIGTERM", () => {
  shutdown()
})

process.on("SIGINT", () => {
  shutdown()
})

async function shutdown() {
  try {
    await Token.deleteMany({})
  } catch (err) {
    console.error(
      "Error clearing tokens from database. See error message below:"
    )
    console.error(err)
  } finally {
    server.close(() => {
      console.log("Closing server")
      mongoose.connection.close(false, () => {
        console.log("Closing database connection")
        process.exit(0)
      })
    })
  }
}
