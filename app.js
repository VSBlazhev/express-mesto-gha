const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {loginUser, createUser} = require('./controllers/user')
const {loginValidation, createUserValidation} = require('./middlewares/userValidation')
const auth = require('./middlewares/auth')

const { PORT = 3000 } = process.env;

const { NOT_FOUND } = require('./utils/constants');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
mongoose.connect('mongodb://localhost:27017/mestodb');

/* app.use((req, res, next) => {
  req.user = {
    _id: '64133f7ccdf6c1054f460a72', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
}); */

app.post('/signin',loginValidation, loginUser);
app.post('/signup',celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about:Joi.string().min(2).max(30),
    avatar:Joi.string().regex(regex),
    email:Joi.string().required().email(),
    password:Joi.string().required()
  })}), createUser);

app.use('/users',auth, usersRouter);
app.use('/cards',auth, cardsRouter);

app.use('/*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  /* console.log(`App listening on port ${PORT}`) */
});
