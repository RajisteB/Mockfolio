const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  symbol: {
    type: String,
    uppercase: true,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Trade = mongoose.model('trades', TradeSchema);