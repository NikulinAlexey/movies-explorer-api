require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const helmet = require('helmet');
const limiter = require('./constatns/express-rate-limit');

const router = require('./routes');
const errorHandler = require('./middlewares/error');

const allowedCors = require('./constatns/allowedCors');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb')
  .then(() => console.log('Подключился к БД'))
  .catch(() => console.log('Ошибка при подключении к БД'));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowedCors,
    credentials: true,
  }),
);
app.use(limiter);
app.use(helmet());

app.use(router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`слушаю ${PORT} порт`);
});
