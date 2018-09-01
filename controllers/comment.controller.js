const Dilemma = require('../models/Dilemma');
const Comment = require('../models/Comment');
const validateCommentInput = require('../validation/comment');

// @route   POST api/dilemmas/comment/:id
module.exports.comment_dilemma = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newComment = new Comment({
    user: req.user.id,
    author: req.user.username,
    commentpicture: req.user.avatar,
    dilemma: req.params.id,
    text: req.body.text
  });

  Dilemma.findById(req.params.id)
    .populate('user')
    .then((dilemma) => {
      dilemma.comments.unshift(newComment);
      dilemma.save();
      return res.json(dilemma);
    });
};

// @route   POST api/dilemmas/comment/:id/:comment_id
module.exports.delete_comment = (req, res) => {
  Dilemma.findById(req.params.id)
    .then((dilemma) => {
      // Check to see if comment exists
      if (
        dilemma.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: 'Comment does not exist' });
      }

      // Get remove index
      const removeIndex = dilemma.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of array
      dilemma.comments.splice(removeIndex, 1);

      dilemma.save().then((dilemma) => res.json(dilemma));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found ' }));
};

// @route   POST api/dilemmas/comment/:commentid/:id
module.exports.reply_to_comment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newComment = new Comment({
    user: req.user.id,
    author: req.user.username,
    commentpicture: req.user.avatar,
    dilemma: req.params.id,
    text: req.body.text
  });

  Dilemma.findById(req.params.id).then((dilemma) => {
    const findComment = (id, comments) => {
      if (comments.length > 0) {
        for (var i = 0; i < comments.length; i++) {
          const comment = comments[i];
          if (comment._id == id) {
            return comment;
          }
          const foundComment = findComment(id, comment.replies);
          if (foundComment) {
            return foundComment;
          }
        }
      }
    };

    const comment = findComment(req.params.commentid, dilemma.comments);

    comment.replies.unshift(newComment);
    dilemma.markModified('comments');
    dilemma.save();

    return res.json(dilemma);
  });
};
