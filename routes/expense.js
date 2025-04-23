const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense");

const authMiddleware = require("../middleware/auth");

router.get("/expense", authMiddleware, expenseController.getExpenses);

router.post("/create-expense", authMiddleware, expenseController.createExpense);

router.post("/edit-expense/:id", authMiddleware, expenseController.editExpense);

router.post(
  "/delete-expense/:id",
  authMiddleware,
  expenseController.deleteExpense
);

module.exports = router;
