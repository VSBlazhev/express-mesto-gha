const {
  WRONG_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  DB_ERROR,
  AUTH_ERROR
} = require('../utils/constants');

const errHandler = (err, req, res, next) =>{
  if (err.code === 11000) {
   return res.status(DB_ERROR).send({messge:"Email уже используется"})
}
if (err.name === 'CastError') {
  return res
    .status(WRONG_DATA)
    .send({ message: 'переданы некорректные данные' });
}
if (err.name === 'ValidationError') {

  return res
    .status(WRONG_DATA)
    .send({ message: 'переданы некорректные данные' });
}

return res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию.' });
next()
}

module.exports = errHandler