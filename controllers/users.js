const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

// возвращает информацию о пользователе(email и имя)
const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;

  User.findById(currentUserId)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  // Обновление пользователя
  User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((updatedUser) => {
      res
        .send({
          email: updatedUser.email,
          name: updatedUser.name,
        });
    })
    .catch(next);
};

module.exports = {
  updateProfile,
  getCurrentUser,
};
