const router = require('express').Router();
const { errors } = require('celebrate');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');

const auth = require('../middlewares/auth');

const {
  errorLogger,
  requestLogger,
} = require('../middlewares/logger');
const {
  login,
  createUser,
} = require('../controllers/auth');
const {
  validateLogin,
  validateСreateUser,
} = require('../constatns/validation-constatns');

router.use(requestLogger);

router.use('/signin', validateLogin, login);
router.use('/signup', validateСreateUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((next) => {
  next(new NotFoundError('Страница не найдена'));
});
router.use(errorLogger);

router.use(errors());

module.exports = router;
