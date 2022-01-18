const router = require('express').Router();
const { Comment } = require('../../db/models')
const allowPost = require('../middleware/allowPost')


router
  .route('/:id')
  .post(allowPost, async (req, res) => {
    const comment = {
      userId: req.session.userId,
      text: req.body.text,
      comicsId: req.params.id,
    };
    try {
      await Comment.create(comment);
      return res.sendStatus(200)
    } catch (error) {
      res.sendStatus(500);
    }
  })

module.exports = router;
