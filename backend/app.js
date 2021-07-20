const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const { celebrate, Joi } = require('celebrate');
const {
  login,
  userCreateHandler,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), userCreateHandler);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.listen(PORT, () => {});
