const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");
const { NOT_FOUND } = require("./utils/constants.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "64133f7ccdf6c1054f460a72", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use('/*',(req,res)=>{
  res.status(NOT_FOUND).send({message:"Страница не найдена"})
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
