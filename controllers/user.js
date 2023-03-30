/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  WRONG_DATA,
  NOT_FOUND,
  SUCCESS,
  AUTH_ERROR,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(SUCCESS).send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(SUCCESS).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch(next);
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch(next);
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch(next);
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return res.status(AUTH_ERROR).send({ message: 'Ошибка авторизации' });
      }
      const token = jwt.sign({ _id: user._id }, 'key');
      return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((user) => {
      if (user._id.toString() !== userId) {
        return res.status(WRONG_DATA).send({ message: 'переданы некорректные данные' });
      }
      return res.status(SUCCESS).send({ data: user });
    })
    .catch(next);
};
