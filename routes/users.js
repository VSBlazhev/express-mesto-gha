const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserInfo,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
