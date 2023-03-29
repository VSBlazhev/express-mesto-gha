const jwt = require('jsonwebtoken')
const {AUTH_ERROR}=require('../utils/constants')

module.exports = (req,res, next)=>{
const token = req.cookies.jwt

if(!token){
  return res.status(AUTH_ERROR).send({message: "Необходима авторизация"})
}
let payload
try{
  payload = jwt.verify(token, 'key')
} catch(err){
return res.status(AUTH_ERROR).send({message: "Необходима авторизация"})
}
req.user = payload
next()
}