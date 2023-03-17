const User = require('../models/user')

module.exports.getUsers = (req, res) =>{
    User.find({})
    .then(users => res.send({data: users}))
    .catch((err) =>{console.log(err.message)})
}

module.exports.getUserById = (req, res) =>{
    User.find(req.params.userId)
    .then(user =>{res.send({data: user})})
    .catch((err) =>{console.log(err.message)})
}

module.exports.createUser = (req,res) =>{
    const {name , about, avatar} = req.body
    User.create({name, about, avatar}, {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true})
    .then(user=>{res.send({data: user})})
    .catch((err) =>{
        if (err.name === 'ValidationError') {
          return res.status(400).send({ message: 'переданы некорректные данные' });
        }
        res.status(500).send({ message: 'Ошибка по умолчанию.' });
      })
}

module.exports.patchUserInfo = (req,res)=>{
    const {name, about} = req.body
    User.findByIdAndUpdate(req.user._id, {name, about })
    .then(user=>{res.send({data: user})})
    .catch((err) =>{console.log(err.message)})
}

module.exports.updateAvatar = (req, res)=>{
    const {avatar} = req.body
    User.findByIdAndUpdate(req.user._id, {avatar})
    .then(user=>{res.send({data: user})})
    .catch((err) =>{console.log(err.message)})
}