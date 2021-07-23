const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const ServerError = require('../errors/server-error');
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
    // res.status(403).send({ message: 'Forbidden request' });
  }
  return User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('User not found'));
        // return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // return res.status(500).send({ message: err.message });
    });
};

const userCreateHandler = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email }).then((userExists) => {
    if (userExists) {
      return next(new ConflictError('Conflict, attempt to register a second account with the same email'));
      // res.status(409).send({ message: 'Conflict
      // attempt to register a second account with the same email' });
    }
    return bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => res.send({ user }))
      .catch((err) => {
        if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
        // res.status(400).send({ message: err.message });
        return next(err);
        // res.status(500).send({ message: err.message });
      });
  })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // res.status(500).send({ message: err.message });
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
        // return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // return res.status(500).send({ message: err.message });
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
        // return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // return res.status(500).send({ message: err.message });
    });
};

const userProfileGetHandler = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('User not found'));
        // return res.status(404).send({ message: 'User not found' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Bad Request'));
      // res.status(400).send({ message: 'Bad Request' });
      return next(err);
      // res.status(500).send({ message: err.message });
    });
};

const login = (req, res, next) => {
  console.log('begining of login controller');
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError('email or password should not be empty'));
    // res
    //   .status(400)
    //   .send({ message: 'email or password should not be empty' });
  }
  return User.findUserByCredentials(email, password).select('+password')
    .then((user) => {
      console.log('login controller token send');
      const token = jwt.sign({
        _id: user._id,
      }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
      // res
      //   .status(401)
      //   .send({ message: err.message });
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
