const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  userHandler,
  userIdHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
  userProfileGetHandler,
} = require('../controllers/users');

function validateUrl(string) {
  return validator.isURL(string);
}

router.get('/', userHandler);

router.get('/:id', userIdHandler);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), userProfileUpdateHandler);

router.get('/me', userProfileGetHandler);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl),
  }).unknown(true),
}), userAvatarUpdateHandler);

module.exports = router;
