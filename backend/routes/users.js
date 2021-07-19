const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  userHandler,
  userIdHandler,
  userCreateHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
} = require('../controllers/users');

router.get('/', userHandler);
router.get('/:id', userIdHandler);
router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), userCreateHandler);
router.patch('/me', userProfileUpdateHandler);
router.patch('/me/avatar', userAvatarUpdateHandler);

module.exports = router;
