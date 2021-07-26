const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/validateURL');
const {
  userHandler,
  userIdHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
  userProfileGetHandler,
} = require('../controllers/users');

router.get('/', userHandler);
router.get('/me', userProfileGetHandler);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), userIdHandler);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), userProfileUpdateHandler);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }).unknown(true),
}), userAvatarUpdateHandler);

module.exports = router;
