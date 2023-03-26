const {Joi, celebrate} = require('celebrate')

const regex = /(ftp|http|https):\/\/.(www\.)?[a-z\-\d]+\.[\w\-.~:/?#[\]@!$&'()*+,;=]{1,}#?/i;

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about:Joi.string().min(2).max(30),
    avatar:Joi.string().regex(regex),
    email:Joi.string().required().email(),
    password:Joi.string().required()
  })
})

module.exports.patchInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about:Joi.string().min(2).max(30)
  })
})

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar:Joi.string().regex(regex),
  })
})

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email:Joi.string().required().email(),
    password:Joi.string().required()
  })
})