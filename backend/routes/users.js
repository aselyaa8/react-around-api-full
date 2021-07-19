const router = require('express').Router();
const {
  userHandler,
  userIdHandler,
  userCreateHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
} = require('../controllers/users');

router.get('/', userHandler);
router.get('/:id', userIdHandler);
router.post('/', userCreateHandler);
router.patch('/me', userProfileUpdateHandler);
router.patch('/me/avatar', userAvatarUpdateHandler);

module.exports = router;
