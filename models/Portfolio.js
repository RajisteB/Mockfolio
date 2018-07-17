const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  currentValue: {
    type: Number,
  },
  holdings: [Schema.Types.Mixed],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);
