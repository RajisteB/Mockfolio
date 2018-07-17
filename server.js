const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const comments = require('./routes/comments');
const portfolio = require('./routes/portfolio');
const trade = require('./routes/trade');

const app = express();
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3001;

app.use('/search', comments);
app.use('/portfolio', portfolio);
app.use('/trades', trade);

app.listen(port, () => console.log(`listening on port ${port}`));

