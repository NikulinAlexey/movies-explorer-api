const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMyMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((myMovies) => {
      res
        .send(myMovies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    id,
    year,
    image,
    nameEN,
    nameRU,
    country,
    duration,
    director,
    thumbnail,
    description,
    trailerLink,
  } = req.body;

  const owner = req.user._id;
  Movie.create({
    id,
    year,
    owner,
    image,
    nameRU,
    nameEN,
    country,
    duration,
    director,
    thumbnail,
    description,
    trailerLink,
  })
    .then((movie) => {
      res
        .send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      const owner = movie.owner.toString();

      if (owner !== userId) {
        throw new ForbiddenError('Можно удалить только свой фильм');
      } else {
        movie.deleteOne()
          .then(() => {
            res
              .send(movie);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMyMovies,
  deleteMovie,
  createMovie,
};
