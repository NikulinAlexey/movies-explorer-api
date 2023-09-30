const mongoose = require('mongoose');

function isRegExValid(v) {
  return /^https?:\/\/[www]?(.[\w,-]{1,}.?){1,}/.test(v);
}

const linkValidator = [isRegExValid, 'Ссылка невалидна'];

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
