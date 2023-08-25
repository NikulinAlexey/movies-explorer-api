const router = require('express').Router();

const {
  validateDeleteMovie,
  validateCreateMovie,
} = require('../constatns/validation-constatns');

const {
  getMyMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('', getMyMovies);
router.post('', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
