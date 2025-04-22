const Expense = require("../models/expense");

module.exports.getExpenses = async (req, res, next) => {
  const userId = req.user.id;
  const expenses = await Expense.find({ user: userId });

  if (!expenses) {
    return res.status(404).json({
      message: "No expenses found",
    });
  }

  res.status(200).json({
    message: "Expenses fetched successfully",
    expenses: expenses,
  });
};

module.exports.createExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;
  const userId = req.user.id;
  try {
    const expense = new Expense({
      amount: amount,
      description: description,
      date: new Date().toISOString(),
      category: category,
      user: userId,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense created successfully",
      expense: expense,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
