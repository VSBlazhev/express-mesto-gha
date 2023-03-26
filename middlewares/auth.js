const jwt = require('jsonwebtoken')

module.exports = (req,res, next)=>{
const token = req.cookie.jwt
if(!token){
  return res.status(401).send({message: "Необходима афторизация"})
}
let payload
try{
  payload = jwt.verify(token, 'key')
} catch(err){

}
req.user = payload
next()
}