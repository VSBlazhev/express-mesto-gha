const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserInfo,
  updateAvatar,
} = require('../controllers/user');
const {patchUserValidation, updateAvatarValidation} = require('../middlewares/userValidation')

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me',patchUserValidation, patchUserInfo);
router.patch('/me/avatar',updateAvatarValidation, updateAvatar);

module.exports = router;
