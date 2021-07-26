const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/validateURL');
const {
  cardsHandler,
  cardCreateHandler,
  cardDeleteHandler,
  cardLikeAddHandler,
  cardLikeDeleteHandler,
} = require('../controllers/cards');

router.get('/', cardsHandler);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }).unknown(true),
}), cardCreateHandler);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), cardDeleteHandler);

router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), cardLikeAddHandler);

router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), cardLikeDeleteHandler);

module.exports = router;
