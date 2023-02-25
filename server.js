// eslint-disable-next-line
const express = require('express');
// eslint-disable-next-line
const fallback = require('express-history-api-fallback');
// eslint-disable-next-line
const path = require('path');

const app = express();
const PORT = 3000;

const root = path.resolve() + '/dist';
app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(PORT);
