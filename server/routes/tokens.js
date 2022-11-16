const express = require("express")
const router = express.Router()

const verifyPassword = require("./middleware/verifyPassword")
const createNewToken = require("./middleware/createNewToken")
const authenticateToken = require("./middleware/authenticateToken")
const deleteToken = require("./middleware/deleteToken")

// Note: Since the Token ID is already in the auth header, it is not passed as a parameter

router.post("/", verifyPassword, createNewToken, function (req, res, next) {
  try {
    res.status(201).json({
      token: req.tokenId
    })
    next()
  } catch (err) {
    return next(err)
  }
})

router.get("/", authenticateToken, function (req, res, next) {
  try {
    res.status(200).send({
      token: req.token.tokenId
    })
  } catch (err) {
    return next(err)
  }
})

router.delete("/", deleteToken, function (req, res, next) {
  try {
    res.status(204).send()
  } catch (err) {
    return next(err)
  }
})

module.exports = router
