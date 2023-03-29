const Card = require('../models/card');
const {
  WRONG_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  SUCCESS,
  FORBIDDEN
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(SUCCESS).send({ data: cards });
    })
    .catch(next)
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(SUCCESS).send({ data: card });
    })
    .catch(next)
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      if(card.owner.toString() !== req.user._id){
       return res.status(FORBIDDEN).send({message:"Ошибка прав"})
      }
     Card.remove(card)
      })
     .then(()=> res.status(SUCCESS).send({message: "Карточка удалена"}))
    .catch(next)
    }

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(SUCCESS).send({ data: card });
    })
    .catch(next)
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(SUCCESS).send({ data: card });
    })
    .catch(next)
};


