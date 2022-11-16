const express = require("express")
const router = express.Router()

const sanitizeNewUserData = require("./middleware/sanitizeNewUserData")
const hashNewPassword = require("./middleware/hashNewPassword")
const saveNewUser = require("./middleware/saveNewUser")
const authenticateToken = require("./middleware/authenticateToken")
const deleteUser = require("./middleware/deleteUser")
const lookupUser = require("./middleware/lookupUser")

router.post(
  "/",
  sanitizeNewUserData,
  hashNewPassword,
  saveNewUser,
  function (req, res, next) {
    try {
      res.status(201).send(req.result)
      next()
    } catch (err) {
      return next(err)
    }
  }
)

router.get(
  "/:username",
  authenticateToken,
  lookupUser,
  function (req, res, next) {
    try {
      res.status(200).send(req.result)
      next()
    } catch (err) {
      return next(err)
    }
  }
)

router.delete(
  "/:username",
  authenticateToken,
  lookupUser,
  deleteUser,
  function (req, res, next) {
    try {
      res.status(204).send()
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = router
