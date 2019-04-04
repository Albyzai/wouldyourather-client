// Import Models
const Dilemma = require('../models/Dilemma');
const User = require('../models/User');

// Import Validation
const validateDilemmaInput = require('../validation/dilemma');

//  @Route  GET api/comments
//  @Desc   Returns all comments
module.exports.getDilemmas = (req, res) => {
  // const paramIds = req.query.ids;
  const params = req.query;

  let query;

  if (params.ids !== void 0 && params.take !== void 0) {
    query = Dilemma.find({ _id: { $nin: params.ids } })
      .populate('user', ['username'])
      .limit(parseInt(params.take));
  } else if (params.ids !== void 0) {
    query = Dilemma.find({ _id: { $nin: params.ids } }).populate('user', [
      'username'
    ]);
  } else {
    query = Dilemma.find().populate('user', ['username']);
  }

  query
    .exec()
    .then((dilemmas) => {
      if (dilemmas != void 0) return res.status(200).json(dilemmas);
      else return res.status(404).json({ message: 'No dilemmas found' });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//  @Route  GET api/dilemmas/{id}/comments
//  @Desc   Returns all comments for specific dilemma
module.exports.getCommentsForDilemma = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Comment.find({ dilemma: id })
    .exec()
    .then((comments) => {
      if (comments !== void 0) return res.status(200).json(comments);
      else return res.status(404).json({ message: 'No comments found' });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
