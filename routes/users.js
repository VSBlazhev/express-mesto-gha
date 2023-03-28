const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserInfo,
  updateAvatar,
  getCurrentUser
} = require('../controllers/user');
const {patchInfoValidation, updateAvatarValidation} = require('../middlewares/userValidation')

router.get('/', getUsers);
router.patch('/me',patchInfoValidation, patchUserInfo);
router.patch('/me/avatar',updateAvatarValidation, updateAvatar);
router.get('/me', getCurrentUser)
router.get('/:userId', getUserById);

module.exports = router;
