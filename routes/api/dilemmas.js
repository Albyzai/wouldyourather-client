const express = require('express');
const router = express.Router();

// Dilemma Model
const Dilemma = require('../../models/Dilemma');

// @route   GET api/dilemmas
// @desc    Get All Dilemmas
// @access  Public
router.get('/', (req,res) => {
  Dilemma.find()
    .sort({ date: -1 })
    .then(dilemmas => res.json(dilemmas));
});

// @route   POST api/dilemmas
// @desc    Create A Dilemma
// @access  Public
router.post('/', (req,res) => {
  const newDilemma = new Dilemma({
    title: req.body.title,
    red: req.body.red,
    blue: req.body.blue
  });

  newDilemma.save().then(dilemma => res.json(dilemma));

});


// @route   DELETE api/dilemmas
// @desc    Delete A Dilemma
// @access  Public
router.delete('/:id', (req,res) => {
  Dilemma.findById(req.params.id)
    .then(dilemma => dilemma.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});




module.exports = router;
