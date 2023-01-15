// eslint-disable-next-line
const express = require('express');
// eslint-disable-next-line
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve() + '/dist/index.html');
});

app.listen(PORT);
