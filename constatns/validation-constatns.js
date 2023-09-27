const { celebrate, Joi } = require('celebrate');

// Валидация запросов для users:
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email:
      Joi.string()
        .required()
        .email()
        .message('Поле "email" должно быть валидным email-адресом')
        .messages({
          'string.required': 'Поле "email" должно быть заполнено',
        }),
    name:
      Joi.string()
        .required()
        .min(2)
        .max(30),
  }),
});

// Валидация запросов для movies:
const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    image:
      Joi.string()
        .required()
        .regex(/^https?:\/\/[www]?(.[\w,-]{1,}.?){1,}/)
        .message('Невалидная ссылка на трейлер'),
    country:
      Joi.string()
        .required(),
    director:
      Joi.string()
        .required(),
    duration:
      Joi.number()
        .required(),
    year: Joi.string()
      .required(),
    description:
      Joi.string()
        .required(),
    trailerLink:
      Joi.string()
        .required()
        .regex(/^https?:\/\/[www]?(.[\w,-]{1,}.?){1,}/)
        .message('Невалидная ссылка на трейлер'),
    thumbnail:
      Joi.string()
        .required()
        .regex(/^https?:\/\/[www]?(.[\w,-]{1,}.?){1,}/)
        .message('Невалидная ссылка на изображение'),
    movieId:
      Joi.number()
        .required(),
    nameRU:
      Joi.string()
        .required(),
    nameEN:
      Joi.string()
        .required(),
  }),
});
const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

// Валидация запросов для авторизации, создания пользователя:
const validateСreateUser = celebrate({
  body: Joi.object().keys({
    name:
      Joi.string()
        .min(2)
        .max(30),
    email:
      Joi.string()
        .required()
        .email()
        .message('Поле "email" должно быть валидным email-адресом')
        .messages({
          'string.required': 'Поле "email" должно быть заполнено',
        }),
    password:
      Joi.string()
        .required()
        .messages({
          'string.empty': 'Поле "password" должно быть заполнено',
        }),
  }),
});
const validateLogin = celebrate({
  body: Joi.object().keys({
    email:
      Joi.string()
        .required()
        .email()
        .message('Поле "email" должно быть валидным email-адресом')
        .messages({
          'string.required': 'Поле "email" должно быть заполнено',
        }),
    password:
      Joi.string()
        .required()
        .messages({
          'string.empty': 'Поле "password" должно быть заполнено2',
        }),
  }),
});

module.exports = {
  // Валидация запросов для /users:
  validateUpdateProfile,
  // Валидация запросов для /cards:
  validateCreateMovie,
  validateDeleteMovie,
  // Валидация запросов для авторизации, создания пользователя:
  validateСreateUser,
  validateLogin,
};
