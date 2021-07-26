const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new UnauthorizedError('Authorization required'));
  }
  if (!authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    const key = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'default-key';
    payload = jwt.verify(token, key);
  } catch (err) {
    return next(new UnauthorizedError('Authorization required'));
  }

  req.user = payload;
  return next();
};
