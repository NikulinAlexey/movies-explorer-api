const router = require('express').Router();
const {
  validateUpdateProfile,
} = require('../constatns/validation-constatns');

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

router.patch('/me', validateUpdateProfile, updateProfile);
router.get('/me', getCurrentUser);

module.exports = router;
