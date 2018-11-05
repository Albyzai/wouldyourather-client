const Dilemma = require('../models/Dilemma');
const Comment = require('../models/Comment');
const validateCommentInput = require('../validation/comment');

//  @Route  GET api/comments
//  @Desc   Returns all comments
module.exports.get_all_comments = (req, res) => {
  Comment.find()
    .sort({ date: -1 })
    .then((comments) => releaseEvents.json(comments))
    .catch((err) => res.status(404).json(err));
};

//  @Route  POST  api/comments
//  @Desc   Creates a comment/reply
module.exports.create_comment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const parentId = req.body.parentId;
  const isReply = parentId ? true : false;

  //  Creates comment
  const newComment = new Comment({
    user: req.user.id,
    author: req.user.username,
    commentpicture: req.user.avatar,
    dilemma: req.body.dilemmaId,
    text: req.body.text
  });

  //  Saves comment
  newComment.save();

  Dilemma.findById({ _id: req.body.dilemmaId })
    .exec()
    .then((dilemma) => {
      if (dilemma) {
        //  If dilemma exists

        if (!isReply) {
          //  If comment is not a reply

          //  Add comment to comments table in dilemma
          dilemma.comments.push(newComment);
          dilemma.save();
        } else {
          //  If comment is a reply

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

          const comment = findComment(parentId, dilemma.comments);

          //comment.replies.unshift(newComment);
          comment.replies.push(newComment);
          comment.save();

          dilemma.markModified('comments');
          dilemma.save();
        }

        return res.status(200).json(dilemma);
      } else {
        //  If dilemma does not exist

        return res.status(400).json('Dilemma not found');
      }
    })
    .catch((err) => res.status(500).json(err));
};

//  @Route  GET api/comments/:id
//  @Desc   Get a specific comment
module.exports.get_comment = (req, res) => {
  const commentId = req.params.id;

  Comment.findById({ _id: commentId })
    .populate('likes')
    .populate('replies')
    .exec()
    .then((comment) => {
      if (comment) {
        return res.status(200).json(comment);
      } else {
        return res.status(400).json('Comment does not exist');
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//  @Route  DELETE  api/comments/:id
//  @Desc   Deletes a specific dilemma
module.exports.delete_comment = (req, res) => {
  //  Get ID of the comment to be deleted
  const commentId = req.params.id;

  //  Find the comment
  Comment.findByIdAndDelete({ _id: commentId })
    .exec()
    .then((comment) => {
      if (comment) {
        return res.status(200).json('Comment deleted');
      }
      return res.status(400).json('Comment not found');
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//  @Route  POST    api/comments/like/:id
//  @Desc   Adds a like to a specific comment
module.exports.like_comment = (req, res) => {
  const user = req.user;
  const commentId = req.params.id;
  Comment.findById({ _id: commentId })
    .exec()
    .then((comment) => {
      //  Check if comment exists
      console.log('comment: ' + JSON.stringify(comment));
      if (comment) {
        if (!comment.likes.includes(user)) {
          comment.likes.push(user);
          comment.save();
        } else {
          return res
            .status(400)
            .json({ alreadyLiked: 'User already liked this comment' });
        }

        Dilemma.findById({ _id: comment.dilemma })
          .exec()
          .then((dilemma) => {
            console.log('Returning dilemma');
            if (dilemma) {
              return res.status(200).json(dilemma);
            } else {
              return res.status(400).json('no dilemma found');
            }
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      } else {
        return res.status(400).json('Comment does not exist');
      }
    });
};
