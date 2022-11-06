require("dotenv").config()

const express = require("express")
const app = express()
const port = 3000

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use(bodyParser.json())

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
