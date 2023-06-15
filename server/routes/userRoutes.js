const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const Authorization = require('../middleware/auth');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/allusers', Authorization.authenticate, userController.allUsers);
router.get('/totalexpenses', Authorization.authenticate, userController.totalExpenses);

module.exports = router;