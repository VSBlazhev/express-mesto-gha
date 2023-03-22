const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  patchUserInfo,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
