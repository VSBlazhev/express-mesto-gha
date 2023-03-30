const {
  WRONG_DATA,
  DEFAULT_ERROR,
  DB_ERROR,
} = require('../utils/constants');

// eslint-disable-next-line consistent-return
const errHandler = (err, req, res, next) => {
  if (err.name === 'AuthorizationError') {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(DB_ERROR).send({ message: 'Email уже используется' });
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

  res.status(DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию.' });
  next();
};

module.exports = errHandler;
