// eslint-disable-next-line
import express from 'express';
import { resolve } from 'path';

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('*', (req, res) => {
  res.sendFile(resolve() + '/dist/index.html');
});

app.listen(PORT);
