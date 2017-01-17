const express  = require('express');
const router   = express.Router();

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const landmarks       = require('../controllers/landmarks');
const walks          = require('../controllers/walks');

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

router.route('/walks')
  .get(walks.index)
  .post(walks.create);
router.route('/walks/:id')
  .get(walks.show)
  .put(walks.update)
  .delete(walks.delete);

module.exports = router;
