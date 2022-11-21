const express = require('express');
const route = require('./routes');
const mongodb = require('./db/connect');

const app = express();
const port = 3000;

app.use('/', route);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port:${port}`);
  }
});
