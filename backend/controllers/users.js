const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const userHandler = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const userIdHandler = (req, res, next) => {
  if (!req.params === req.user._id) {
    return next(new ForbiddenError('Forbidden request'));
  }
  return User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('User not found'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

const userCreateHandler = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email }).then((userExists) => {
    if (userExists) {
      return next(new ConflictError('Conflict, attempt to register a second account with the same email'));
    }
    return bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => {
        res.send({
          _id: user._id,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
        return next(err);
      });
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

const userProfileUpdateHandler = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('User not found'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

const userAvatarUpdateHandler = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('User not found'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

const userProfileGetHandler = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('User not found'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError('email or password should not be empty'));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, process.env.JWT_SECRET ? process.env.JWT_SECRET : 'default-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
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
