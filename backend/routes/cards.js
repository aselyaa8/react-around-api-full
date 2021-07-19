const router = require('express').Router();
const {
  cardsHandler,
  cardCreateHandler,
  cardDeleteHandler,
  cardLikeAddHandler,
  cardLikeDeleteHandler,
} = require('../controllers/cards');

router.get('/', cardsHandler);
router.post('/', cardCreateHandler);
router.delete('/:id', cardDeleteHandler);
router.put('/:cardId/likes', cardLikeAddHandler);
router.delete('/:cardId/likes', cardLikeDeleteHandler);

module.exports = router;
