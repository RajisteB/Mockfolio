const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

router.get('/', (req, res) => {
  Portfolio.find()
    .then(portfolio => res.json(portfolio))
    .catch(err => console.log(err));
});

router.post('/', (req,res) => {
  const port = new Portfolio({
    holdings: req.body.holdings
  });
  port.save()
    .then(p => res.json(p))
    .catch(err => console.log(err));
})

router.put('/:id', (req, res) => {
  const newValue = new Portfolio({
    holdings: req.body.holdings
  });
  newValue.markModified('holdings');
  newValue.save()
    .then(portfolio => res.json(portfolio))
    .catch(err => console.log(err));
});

module.exports = router;