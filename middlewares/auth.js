const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    return new UnauthorizedError('Ошибка авторизации в auth middleware');
  }

  req.user = payload;

  return next();
};

module.exports = auth;
