const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const Card = require('../models/card');

const cardsHandler = (req, res, next) => {
  Card.find({}).populate('user')
    .then((cards) => res.send(cards))
    .catch(next);
};

const cardCreateHandler = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
      return next(err);
    });
};

const cardDeleteHandler = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.id)
          .then((removedCard) => {
            if (removedCard === null) {
              return next(new NotFoundError('Card not found'));
            }
            return res.send(removedCard);
          })
          .catch((err) => {
            if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
            return next(err);
          });
      }
      return next(new ForbiddenError('Forbidden request'));
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

const cardLikeAddHandler = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) {
      return next(new NotFoundError('Card not found'));
    }
    return res.send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

const cardLikeDeleteHandler = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) {
      return next(new NotFoundError('Card not found'));
    }
    return res.send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

module.exports = {
  cardsHandler,
  cardCreateHandler,
  cardDeleteHandler,
  cardLikeAddHandler,
  cardLikeDeleteHandler,
};
