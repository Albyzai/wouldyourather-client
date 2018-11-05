// Import Models
const Dilemma = require('../models/Dilemma');
const User = require('../models/User');

// Import Validation
const validateDilemmaInput = require('../validation/dilemma');

// @route   POST api/dilemmas
module.exports.create_dilemma = (req, res) => {
  const { errors, isValid } = validateDilemmaInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newDilemma = new Dilemma({
    user: req.user.id,
    prefix: req.body.prefix,
    title: req.body.title,
    red: req.body.red,
    blue: req.body.blue
  });

  newDilemma
    .save()
    .then((dilemma) => res.json(dilemma))
    .catch((err) => res.json(err));
};

// @route   GET api/dilemmas/all
module.exports.get_dilemmas = (req, res) => {
  Dilemma.find()
    .sort({ date: -1 })
    .populate('user', ['username'])
    .then((dilemmas) => res.json(dilemmas))
    .catch((err) => res.status(404).json(err));
};

// @route   GET api/dilemmas/:slug
module.exports.get_dilemma = (req, res) => {
  Dilemma.findOne({ slug: req.params.slug })
    .populate({
      path: ''
    })

    .then((dilemma) => {
      if (!dilemma) {
        res.status(404).json({ err: 'This post does not exist' });
      }
      res.json(dilemma);
    })
    .catch((err) => res.status(404).json(err));
};

// @route   GET api/dilemmas
module.exports.get_dilemma_random = (req, res) => {
  var cookie = req.cookies.visited;
  if (cookie === undefined) {
    Dilemma.count().exec((err, count) => {
      const random = Math.floor(Math.random() * count);

      Dilemma.findOne()
        .skip(random)
        .populate('user')
        .populate('comments.comment')
        .exec()
        .then((dilemma) => {
          if (!dilemma) {
            res.status(404).json({ err: 'Could not find dilemma' });
          }
          res.cookie('visited');
          res.json(dilemma);
        })
        .catch((err) => res.status(400).json({ err: 'An error occured' }));
    });
  } else {
  }
};

module.exports.get_next_dilemma = (req, res) => {};

module.exports.get_previous_dilemma = (req, res) => {};

// @route   DELETE api/dilemmas/:id
module.exports.delete_dilemma = (req, res) => {
  // Check for valid object ID
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ err: 'Dilemma does not exist' });
  }

  Dilemma.findOneAndRemove(
    { user: req.user.id, _id: req.params.id },
    (err, dilemma) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.json({ success: 'Dilemma has been deleted' });
      }
    }
  );
};

// @route   POST api/dilemmas/:color/:id
module.exports.vote_dilemma = (req, res) => {
  const color = req.params.color;
  const userId = req.user.id;
  const dilemmaId = req.params.id;

  console.log(
    'color: ' +
      color +
      '\n' +
      'user ID: ' +
      userId +
      '\n' +
      'dilemma ID: ' +
      dilemmaId
  );

  User.findById({ _id: userId })
    .exec()
    .then((user) => {
      //  Check if user is found
      if (user) {
        console.log('User is found: ' + user.username);
        Dilemma.findById({ _id: dilemmaId })
          .populate('user')
          .then((dilemma) => {
            //console.log('inside dilemma: ' + dilemma);
            console.log('Dilemma is found: ' + dilemma.red);

            if (
              !dilemma.red_votes.includes(user) &&
              !dilemma.blue_votes.includes(user)
            ) {
              if (color === 'red') {
                dilemma.red_votes.push(user);
              } else if (color === 'blue') {
                dilemma.blue_votes.push(user);
              }

              console.log('user in dilemma: ' + dilemma.red_votes[0]);
              dilemma.save();
              console.log('No error occurred so far');
              return res.status(200).json(dilemma);
            }
          })
          .catch((err) => {
            return res.status(400).json({ error: err });
          });
      } else {
        console.log('User is not found');
        return res
          .status(400)
          .json({ message: 'No valid entry found for user' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

// @route   POST api/dilemmas/:color/:id

/*module.exports.vote_dilemma = (req, res) => {
  
  if (req.params.color === 'red') {
    Dilemma.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { red_votes: 1 } }
    ).then((dilemma) => {
      return res.json(dilemma);
    });
  } else if (req.params.color === 'blue') {
    Dilemma.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { blue_votes: 1 } }
    )
      .populate('user')
      .then((dilemma) => {
        return res.json(dilemma);
      });
  } else {
    res.status(404).json({ err: 'fuck you' });
  }
}; */

module.exports.vote_dilemma_authenticated = (req, res) => {
  if (req.params.color === 'red') {
    Dilemma.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { red_votes: 1 } }
    ).then((dilemma) => {
      return res.json(dilemma);
    });
  } else if (req.params.color === 'blue') {
    Dilemma.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { blue_votes: 1 } }
    )
      .populate('user')
      .then((dilemma) => {
        return res.json(dilemma);
      });
  } else {
    res.status(404).json({ err: 'fuck you' });
  }
};

// @route   POST api/dilemmas/like/:id
module.exports.like_dilemma = (req, res) => {
  Dilemma.findById(req.params.id)
    .then((dilemma) => {
      if (
        dilemma.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyLiked: 'User already liked this dilemma' });
      }

      //Add user id to likes array
      dilemma.likes.unshift({ user: req.user.id });

      dilemma.save().then((dilemma) => res.json(dilemma));
    })
    .catch((err) =>
      res.status(404).json({ dilemmanotfound: 'No dilemma found' })
    );
};

// @route   POST api/dilemmas/unlike/:id
module.exports.unlike_dilemma = (req, res) => {
  Dilemma.findById(req.params.id)
    .then((dilemma) => {
      if (
        dilemma.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notLiked: 'You have not yet liked this post' });
      }

      // Get remove index
      const removeIndex = dilemma.likes
        .map((item) => item.user.toString())
        .indexOf(req.user.id);

      // Splice out of array
      dilemma.likes.splice(removeIndex, 1);

      // Save
      dilemma.save().then((dilemma) => res.json(dilemma));
    })
    .catch((err) =>
      res.status(404).json({ dilemmanotfound: 'No dilemma found' })
    );
};
