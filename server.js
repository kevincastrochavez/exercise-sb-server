const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes');
const mongodb = require('./db/connect');

const app = express();
const port = 3000;

app.use(bodyParser.json()).use('/', route);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port:${port}`);
  }
});
