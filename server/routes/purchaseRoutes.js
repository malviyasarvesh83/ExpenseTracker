const express = require('express');
const router = express.Router();

const purchaseController = require('../controllers/purchase-controller');
const Authorization = require("../middleware/auth");

router.get('/premiummembership', Authorization.authenticate, purchaseController.purchasePremium);
router.post('/updatetransactionstatus', Authorization.authenticate, purchaseController.updateTransactionStatus);
router.post('/paymentfailed', Authorization.authenticate, purchaseController.paymentFailed);

module.exports = router;