const express = require('express');
const router = express.Router();
const Comments = require('../models/comments.js');

router.get('/', (req, res) => {
  Comments.find()
    .then(comments => res.json(comments));
});

router.post('/', (req, res) => {
  const newComment = new Comments({ 
    name: req.body.name,
    symbol: req.body.symbol,
    comment: req.body.comment,
    upvotes: req.body.upvotes,
    downvotes: req.body.downvotes,
    commentdate: req.body.commentdate,
  });
});

module.exports = router;