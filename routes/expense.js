const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense");

const authMiddleware = require("../middleware/auth");

router.get("/expense", authMiddleware, expenseController.getExpenses);

router.post("/expense", authMiddleware, expenseController.createExpense);

module.exports = router;
