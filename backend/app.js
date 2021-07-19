const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '60b557968ecce3cbc417c023',
  };

  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
