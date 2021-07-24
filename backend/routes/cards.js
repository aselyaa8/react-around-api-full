const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
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
    link: Joi.string(),
  }).unknown(true),
}), cardCreateHandler);

router.delete('/:id', cardDeleteHandler);

router.put('/likes/:cardId', cardLikeAddHandler);

router.delete('/likes/:cardId', cardLikeDeleteHandler);

module.exports = router;
