const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {loginUser, createUser} = require('./controllers/user')
const auth = require('./middlewares/auth')
const errHandler = require('./middlewares/errHandler')
const { PORT = 3000 } = process.env;

const { NOT_FOUND } = require('./utils/constants');
const { loginValidation, createUserValidation } = require('./middlewares/userValidation');
const { errors } = require('celebrate');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');


app.post('/signin',loginValidation, loginUser);
app.post('/signup',createUserValidation, createUser);

app.use('/users',auth, usersRouter);
app.use('/cards',auth, cardsRouter);

app.use('/*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
});
app.use(errors())
app.use(errHandler)
app.listen(PORT, () => {

});
