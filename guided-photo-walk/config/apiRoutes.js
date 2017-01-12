const express  = require('express');
const router   = express.Router();

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const landmarks           = require('../controllers/landmarks');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .put(users.update);

router.route('/landmarks')
  .get(landmarks.index)
  .post(landmarks.create);
router.route('/landmarks/:id')
  .get(landmarks.show)
  .put(landmarks.update)
  .delete(landmarks.delete);

module.exports = router;
