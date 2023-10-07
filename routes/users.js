const router = require('express').Router();
const {
  validateUpdateProfile,
} = require('../constatns/validation-constatns');

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
