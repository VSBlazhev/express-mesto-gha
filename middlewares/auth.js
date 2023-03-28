const jwt = require('jsonwebtoken')

module.exports = (req,res, next)=>{
const token = req.cookies.jwt

if(!token){
  /* console.log(err.name) */
  return res.status(401).send({message: "Необходима авторизация"})
}
let payload
try{
  payload = jwt.verify(token, 'key')
} catch(err){
return res.status(401).send({message: err.message})
}
req.user = payload
next()
}