const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const data = require('./routes/external/data');
const portfolio = require('./routes/internal/portfolio');
const trade = require('./routes/internal/trade');

const app = express();
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3001;

app.use('/search', data);
app.use('/portfolio', portfolio);
app.use('/trades', trade);


app.listen(port, () => console.log(`listening on port ${port}`));

