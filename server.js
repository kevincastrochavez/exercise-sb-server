const express = require('express');
const route = require('./routes');

const app = express();
const port = 3000;

app.use('/', route);

app.listen(port || 3000, () => {
  console.log(`Listening on port ${port}`);
});
