const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  userHandler,
  userIdHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
} = require('../controllers/users');

router.get('/', userHandler);
router.get('/:id', userIdHandler);
router.patch('/me', userProfileUpdateHandler);
router.patch('/me/avatar', userAvatarUpdateHandler);

module.exports = router;
