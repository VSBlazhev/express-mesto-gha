const User = require('../models/user');
const {
  WRONG_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  SUCCESS,
} = require('../utils/constants');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(WRONG_DATA).send({ message: 'Некорректный id' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
  .then((hash)=>{
  User.create({ name, about, avatar, email, password: hash }, {runValidators: true})
})
    .then((user) => {
      res.status(SUCCESS).send({ data: user }); /* не приходит в ответ JSON  */
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(WRONG_DATA)
          .send({ message: 'переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(WRONG_DATA)
          .send({ message: 'переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(WRONG_DATA)
          .send({ message: 'переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.loginUser = (req,res) => {
  const {email, password} = req.body;

  User.findUserByCredentials(email, password)
  .then((user)=>{
    const token = jwt.sign({_id: user._id}, 'key')
    res.cookie('jwt', token,{ maxAge: 3600000 * 24 * 7, httpOnly: true }).send({token})
  })
  .catch((err)=>{
    res.status(401).send({ message: err.message })
  })


}

module.exports.currentUser = (req,res) =>{
  User.findById(req.user._id)
  .then((user)=> res.send({data: user}))
}