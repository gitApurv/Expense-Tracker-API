//Importing Express
const express = require("express");

//Creating the router
const router = express.Router();

//Importing Middleware
const authMiddleware = require("../middleware/auth");

//Importing Controller
const expenseController = require("../controllers/expense");

//Get all expenses
router.get("/expenses", authMiddleware, expenseController.getExpenses);

//Get a single expense
router.get("/expense/:id", authMiddleware, expenseController.getExpense);

//Create a new expense
router.post("/create-expense", authMiddleware, expenseController.createExpense);

//Update an expense
router.post("/edit-expense/:id", authMiddleware, expenseController.editExpense);

//Delete an expense
router.post(
  "/delete-expense/:id",
  authMiddleware,
  expenseController.deleteExpense
);

router.get("/summary", authMiddleware, expenseController.getSummary);

//Exporting the router
module.exports = router;
