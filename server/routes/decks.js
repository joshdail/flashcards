const express = require("express")
const router = express.Router()

const authenticateToken = require("./middleware/authenticateToken")
const lookupDeck = require("./middleware/lookupDeck")
const sanitizeNewDeckData = require("./middleware/sanitizeNewDeckData")
const saveNewDeck = require("./middleware/sanitizeNewDeckData")
const updateDeck = require("./middleware/updateDeck")
const deleteDeck = require("./middleware/deleteDeck")

router.post(
  "/",
  authenticateToken,
  sanitizeNewDeckData,
  saveNewDeck,
  function (req, res, next) {
    try {
      res.status(201).send(req.result)
      next()
    } catch (err) {
      return next(err)
    }
  }
)

router.get("/:name", authenticateToken, lookupDeck, function (req, res, next) {
  try {
    res.status(200).send(req.result)
    next()
  } catch (err) {
    return next(err)
  }
})

router.put(
  "/:name",
  authenticateToken,
  lookupDeck,
  updateDeck,
  function (req, res, next) {
    try {
      res.status(200).send(req.result)
    } catch (err) {
      return next(err)
    }
  }
)

router.delete(
  "/:name",
  authenticateToken,
  lookupDeck,
  deleteDeck,
  function (req, res, next) {
    try {
      res.status(204).send()
      next()
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = router
