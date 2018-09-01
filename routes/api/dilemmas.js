const express = require('express');
const router = express.Router();

// Import & Setup Authorization
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });

// Import Controllers
const DilemmaController = require('../../controllers/dilemma.controller');
const CommentController = require('../../controllers/comment.controller');

// @route   GET api/dilemmas
// @desc    Get a random Dilemma
// @access  Public
router.get('/', DilemmaController.get_dilemma_random);

// @route   POST api/dilemmas
// @desc    Create A Dilemma
// @access  Public
router.post('/', auth, DilemmaController.create_dilemma);

// @route   GET api/dilemmas/all
// @desc    Get All Dilemmas
// @access  Public
router.get('/all', DilemmaController.get_dilemmas);

// @route   GET api/dilemmas/:slug
// @desc    Get a single dilemma with :slug
// @access  Public
router.get('/:slug', DilemmaController.get_dilemma);

// @route   DELETE api/dilemmas/:id
// @desc    Delete Dilemma
// @access  Public
router.delete('/:id', auth, DilemmaController.delete_dilemma);

// @route   POST api/dilemmas/like/:id
// @desc    Like a dilemma
// @access  Private
router.post('/like/:id', auth, DilemmaController.like_dilemma);

// @route   GET api/dilemmas/unlike/:id
// @desc    Unlike a dilemma
// @access  Private
router.post('/unlike/:id', auth, DilemmaController.unlike_dilemma);

// @route   POST api/dilemmas/comment/:id
// @desc    Create a Comment on a Dilemma
// @access  Private
router.post('/comment/:id', auth, CommentController.comment_dilemma);

// @route   POST api/dilemmas/comment/:commentid/:id
// @desc    Create a reply to a comment
// @access  Private
router.post(
  '/comment/:commentid/:id',
  auth,
  CommentController.reply_to_comment
);

// @route   POST api/dilemmas/comment/:id/:comment_id
// @desc    Remove comment from dilemma
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  auth,
  CommentController.delete_comment
);

// @route   POST api/dilemmas/:color/:id
// @desc    Vote on the specified dilemma by :color
// @access  Public
router.post('/:color/:id', DilemmaController.vote_dilemma);

module.exports = router;
