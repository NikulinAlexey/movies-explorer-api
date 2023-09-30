const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const UnauthorizedError = require('../errors/unauthorized-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Неправльная почта или пароль'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            // создаю токен
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'dev-secret');

            // Зашиваю токен в куку
            res.cookie('jwt', jwt, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
            res.send(user);
          } else {
            return new UnauthorizedError('Неправильная почта или пароль');
          }
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        name,
        email,
        password: hashedPassword,
      })
        .then((createdUser) => {
          res
            .status(201)
            .send(createdUser.toJSON());
        })
        .catch(next);
    })
    .catch(next);
};

const signOut = (req, res, next) => {
  try {
    res.cookie(
      'jwt',
      null,
      {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: true,
      },
    );
    res.send({ message: 'Успешный logOut' });
  } catch (err) {
    return next(new Error('Ошибка при logOut'));
  }

  // next();
};

module.exports = {
  login,
  signOut,
  createUser,
};
