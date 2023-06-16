const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPassword-controller');
const Authorization = require('../middleware/auth');

router.post('/forgotpassword', forgotPasswordController.forgotPassword);
router.get("/resetpassword/:id", forgotPasswordController.resetPassword);
router.post("/updatepassword/:id", forgotPasswordController.updatePassword);

module.exports = router;