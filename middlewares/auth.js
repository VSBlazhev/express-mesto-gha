const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationErr');

function Auth(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthorizationError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;
  next();
}

module.exports = Auth;
