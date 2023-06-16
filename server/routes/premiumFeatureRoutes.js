const express = require('express');
const router = express.Router();

const Authorization = require('../middleware/auth');
const premiumFeatureController = require('../controllers/premiumFeature-controller');

router.get('/showleaderboard', Authorization.authenticate, premiumFeatureController.getUserLeaderBoard);


module.exports = router;