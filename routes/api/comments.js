const express = require('express');
const router = express.Router();

// Import & Setup Authorization
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });

// Import Controllers
const CommentController = require('../../controllers/comment.controller');

// @route   GET api/comments
// @desc    Get all comments
// @access  Private
router.get('/', auth, CommentController.get_all_comments);

// @route   POST api/comments
// @desc    Creates a comment
// @access  Private
router.post('/', auth, CommentController.create_comment);

// @route   GET api/comments/:id
// @desc    Get a specific comment
// @access  Private
router.get('/:id', CommentController.get_comment);

// @route   DELETE api/comments/:id
// @desc    Delete a specific comment
// @access  Private
router.delete('/:id', CommentController.delete_comment);

// @route   POST api/comments/like/:id
// @desc    Adds a like to a comment
// @access  Private
router.post('/like/:id', auth, CommentController.like_comment);

module.exports = router;
