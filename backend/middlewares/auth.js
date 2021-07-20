const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }

  req.user = payload;

  next();
};

module.exports = { auth };
