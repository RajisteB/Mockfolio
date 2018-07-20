const express = require('express');
const router = express.Router();
const Trades = require('../../models/Trades');


router.get('/', (req, res) => {
  Trades.find()
    .then(trades => res.json(trades))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  const newTrade = new Trades({
    symbol: req.body.symbol,
    shares: req.body.shares,
    position: req.body.position,
    price: req.body.price,
    value: req.body.value
  });

  newTrade.save()
    .then(trade => res.json(trade));
});

module.exports = router;
