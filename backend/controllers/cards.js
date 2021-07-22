const Card = require('../models/card');

const cardsHandler = (req, res) => {
  Card.find({}).populate('user')
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const cardCreateHandler = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: err.message });
    });
};

const cardDeleteHandler = (req, res) => {
  let isAuthorized = false;
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner === req.user._id) {
        isAuthorized = true;
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });

  if (!isAuthorized) {
    return res.status(403).send({ message: 'Forbidden request' });
  }

  return Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });
};

const cardLikeAddHandler = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) {
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.send({ card });
  })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });
};

const cardLikeDeleteHandler = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card === null) {
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.send({ card });
  })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  cardsHandler,
  cardCreateHandler,
  cardDeleteHandler,
  cardLikeAddHandler,
  cardLikeDeleteHandler,
};
