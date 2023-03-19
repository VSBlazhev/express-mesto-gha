const Card = require("../models/card");
const {
  WRONG_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  SUCCESS,
} = require("../utils/constants");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(SUCCESS).send({ data: cards });
    })
    .catch((err) => {
      res.status(DEFAULT_ERROR).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(SUCCESS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(WRONG_DATA)
          .send({ message: "переданы некорректные данные" });
      }
      res.status(DEFAULT_ERROR).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, {new: true})
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      } else{
      res
        .status(200)
        .send({data:card,  message: "Карточка успешно удалена" })};
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(WRONG_DATA)
          .send({ message: "переданы некорректные данные" });
      }
      res.status(DEFAULT_ERROR).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      }
      res.status(SUCCESS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(WRONG_DATA)
          .send({ message: "переданы некорректные данные" });
      }
      res.status(DEFAULT_ERROR).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      }
      res.status(SUCCESS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(WRONG_DATA)
          .send({ message: "переданы некорректные данные" });
      }
      res.status(DEFAULT_ERROR).send({ message: "Ошибка по умолчанию." });
    });
};
