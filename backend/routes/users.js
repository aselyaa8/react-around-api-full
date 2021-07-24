const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  userHandler,
  userIdHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
  userProfileGetHandler,
} = require('../controllers/users');

router.get('/', userHandler);
router.get('/me', userProfileGetHandler);
router.get('/:id', userIdHandler);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), userProfileUpdateHandler);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }).unknown(true),
}), userAvatarUpdateHandler);

module.exports = router;
