const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  cardsHandler,
  cardCreateHandler,
  cardDeleteHandler,
  cardLikeAddHandler,
  cardLikeDeleteHandler,
} = require('../controllers/cards');

function validateUrl(string) {
  return validator.isURL(string);
}

router.get('/', cardsHandler);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().custom(validateUrl),
  }).unknown(true),
}), cardCreateHandler);

router.delete('/:id', cardDeleteHandler);

router.put('/:cardId/likes', cardLikeAddHandler);

router.delete('/:cardId/likes', cardLikeDeleteHandler);

module.exports = router;
