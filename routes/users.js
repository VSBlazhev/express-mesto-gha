const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserInfo,
  updateAvatar,
} = require('../controllers/user');
const {patchInfoValidation, updateAvatarValidation} = require('../middlewares/userValidation')

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me',patchInfoValidation, patchUserInfo);
router.patch('/me/avatar',updateAvatarValidation, updateAvatar);

module.exports = router;
