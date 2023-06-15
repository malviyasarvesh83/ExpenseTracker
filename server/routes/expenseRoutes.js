const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense-controller');
const Authorization = require('../middleware/auth');

router.get("/expense", Authorization.authenticate, expenseController.getExpense);
router.post("/expense", Authorization.authenticate, expenseController.addExpense);
router.get("/expense/:id", Authorization.authenticate, expenseController.editExpense);
router.put("/expense/:id", Authorization.authenticate, expenseController.updateExpense);
router.delete("/expense/:id", Authorization.authenticate, expenseController.deleteExpense);

module.exports = router;