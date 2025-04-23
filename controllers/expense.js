//Importing Model
const Expense = require("../models/expense");

//Get all expenses
module.exports.getExpenses = async (req, res, next) => {
  //Getting the user id from the request
  const userId = req.user.id;

  //Finding the expenses
  const expenses = await Expense.find({ user: userId });

  //Checking if the expenses are found
  if (!expenses) {
    return res.status(404).json({
      message: "No expenses found",
    });
  }

  //Sending the response
  res.status(200).json({
    message: "Expenses fetched successfully",
    expenses: expenses,
  });
};

//Get a single expense
module.exports.getExpense = async (req, res, next) => {
  //Getting the expense id from the request
  const expenseId = req.params.id;

  try {
    //Finding the expense
    const expense = await Expense.findById(expenseId);

    //Checking if the expense is found
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    //Sending the response
    res.status(200).json({
      message: "Expense fetched successfully",
      expense: expense,
    });
  } catch (err) {
    //Sending the response
    res.status(500).json({
      message: err.message,
    });
  }
};

//Create a new expense
module.exports.createExpense = async (req, res, next) => {
  //Getting the amount, description, category from the request body
  const { amount, description, category } = req.body;

  //Getting the user id from the request
  const userId = req.user.id;

  try {
    //Creating a new expense
    const expense = new Expense({
      amount: amount,
      description: description,
      date: new Date().toISOString(),
      category: category,
      user: userId,
    });

    //Saving the expense
    await expense.save();

    //Sending the response
    res.status(201).json({
      message: "Expense created successfully",
      expense: expense,
    });
  } catch (err) {
    //Sending the response
    res.status(500).json({
      message: err.message,
    });
  }
};

//Update an expense
module.exports.editExpense = async (req, res, next) => {
  //Getting the amount, description, category from the request body
  const { amount, description, category } = req.body;

  try {
    //Updating the expense
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        amount: amount,
        description: description,
        category: category,
      },
      { new: true }
    );

    //Checking if the expense is found
    if (!expense) {
      //Sending the response
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    //Sending the response
    res.status(200).json({
      message: "Expense updated successfully",
      expense: expense,
    });
  } catch (err) {
    //Sending the response
    res.status(500).json({
      message: err.message,
    });
  }
};

//Delete an expense
module.exports.deleteExpense = async (req, res, next) => {
  //Getting the expense id from the request
  const expenseId = req.params.id;

  try {
    //Deleting the expense
    const expense = await Expense.findByIdAndDelete(expenseId);

    //Checking if the expense is found
    if (!expense) {
      //Sending the response
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    //Sending the response
    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (err) {
    //Sending the response
    res.status(500).json({
      message: err.message,
    });
  }
};
