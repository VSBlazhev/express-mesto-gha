const User = require('../models/user');
const {
  WRONG_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  SUCCESS,
  AUTH_ERROR
} = require('../utils/constants');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch(next)
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(SUCCESS).send({ data: user });
    })
    .catch(next)
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
  .then((hash)=>{
 return User.create({ name, about, avatar, email, password: hash })
})
    .then((user) => {

    return  res.status(SUCCESS).send({ data: user });
    })
    .catch(next)
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
   return   res.status(SUCCESS).send({ data: user });
    })
    .catch(next)

};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
   return res.status(SUCCESS).send({ data: user });
    })
    .catch(next)
};

module.exports.loginUser = (req,res) => {
  const {email, password} = req.body;
  console.log(req.body)
  User.findUserByCredentials(email, password)
  .then((user)=>{

    const token = jwt.sign({_id: user._id}, 'key')
  return  res.cookie('jwt', token,{ maxAge: 3600000 * 24 * 7, httpOnly: true }).send({token})
  })
  .catch((err)=>{
    res.status(AUTH_ERROR).send({ message: "Ошибка авторизации" })
  })


}

module.exports.getCurrentUser = (req,res, next) =>{
 const userId = req.user._id
 return User.findById(userId)
  .then((user)=>{
  if(user._id !== userId){
    return res.status(WRONG_DATA).send({message: 'переданы некорректные данные'})
  } res.status(SUCCESS).send({data: user})
})
  .catch(next)
}