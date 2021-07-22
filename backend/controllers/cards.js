const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const Card = require('../models/card');

const cardsHandler = (req, res, next) => {
  Card.find({}).populate('user')
    .then((cards) => res.send(cards))
    .catch(next);
  // res.status(500).send({ message: err.message })
};

const cardCreateHandler = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
      // res.status(400).send({ message: err.message });
      return next(err);
      // res.status(500).send({ message: err.message });
    });
};

const cardDeleteHandler = (req, res, next) => {
  let isAuthorized = false;
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner === req.user._id) {
        isAuthorized = true;
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // res.status(500).send({ message: err.message });
    });

  if (!isAuthorized) {
    return next(new ForbiddenError('Forbidden request'));
    // res.status(403).send({ message: 'Forbidden request' });
  }

  return Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Card not found'));
        // res.status(404).send({ message: 'Card not found' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // res.status(500).send({ message: err.message });
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
      // res.status(404).send({ message: 'Card not found' });
    }
    return res.send({ card });
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // res.status(500).send({ message: err.message });
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
      // res.status(404).send({ message: 'Card not found' });
    }
    return res.send({ card });
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // res.status(500).send({ message: err.message });
    });
};

module.exports = {
  cardsHandler,
  cardCreateHandler,
  cardDeleteHandler,
  cardLikeAddHandler,
  cardLikeDeleteHandler,
};
