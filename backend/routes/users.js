const router = require('express').Router();
const {
  userHandler,
  userIdHandler,
  userProfileUpdateHandler,
  userAvatarUpdateHandler,
  userProfileGetHandler,
} = require('../controllers/users');

router.get('/', userHandler);
router.get('/:id', userIdHandler);
router.patch('/me', userProfileUpdateHandler);
router.get('/me', userProfileGetHandler);
router.patch('/me/avatar', userAvatarUpdateHandler);

module.exports = router;
