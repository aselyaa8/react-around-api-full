const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userHandler = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const userIdHandler = (req, res) => {
  if (!req.params === req.user._id) {
    return res.status(401).send({ message: 'Forbidden request' });
  }
  return User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });
};

const userCreateHandler = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: err.message });
      return res.status(500).send({ message: err.message });
    });
};

const userProfileUpdateHandler = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });
};

const userAvatarUpdateHandler = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });
};

const userProfileGetHandler = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Bad Request' });
      return res.status(500).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password).select('+password')
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  userHandler,
  userIdHandler,
  userCreateHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
  userProfileGetHandler,
  login,
};
