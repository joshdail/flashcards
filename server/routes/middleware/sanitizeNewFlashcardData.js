const createError = require("http-errors")

const sanitizeNewFlashcardData = function (req, res, next) {
  const question =
    typeof req.body.question === "string" && req.body.question.trim().length > 0
      ? req.body.question.trim()
      : null

  const answer =
    typeof req.body.answer === "string" && req.body.answer.trim().length > 1
      ? req.body.answer.trim()
      : null

  if (!question || !answer) {
    return next(
      createError(
        400,
        "Question and answer must be submitted to create new flashcard"
      )
    )
  }
  req.question = question
  req.answer = answer
  next()
}

module.exports = sanitizeNewFlashcardData
