const Expense = require('../models/expense');
const User = require('../models/user');

exports.getExpense = async (req, res) => {
  try {
    const itemsPerPage = +req.query.rows;
    const page = +req.query.page;

    const query = Expense.find({ userId: req.user.id })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const response = await query.exec();
    const totalItems = await Expense.countDocuments({ userId: req.user.id });

    console.log(`My Total Items=${totalItems}`);

    return res.status(200).json({
      response,
      name: req.user.name,
      currentPage: page,
      hasNextPage: itemsPerPage * page < totalItems,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / itemsPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error while calling getExpense API" });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const userId = req.user.id;
    const response = await Expense.create({
      amount: amount,
      description: description,
      category: category,
      userId: userId,
    });
    response.save();
    const totalExpense = +req.user.totalExpenses + +amount;
    const user = await User.findById(req.user.id);
    await user.updateOne({ totalExpenses: totalExpense });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Error while calling addExpense Api' });
  }
}

exports.editExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Expense.findById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "Error while calling editExpense Api" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAmount = req.body.amount;
    const updatedCategory = req.body.category;
    const updatedDescription = req.body.description;

    const response = await Expense.findById(id);
    response.amount = updatedAmount;
    response.category = updatedCategory;
    response.description = updatedDescription;
    response.save( { userId: req.user.id } );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: "Error while calling updateExpense Api" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Expense.findById(id);
    const amount = response.amount;
    console.log('My Deleted Amount:', amount);
    console.log('My Id=',req.user.id);
    response.deleteOne( { userId: req.user.id } );
    const totalExpense = Number(req.user.totalExpenses) - Number(amount);
    const user = await User.findById(req.user.id);
    await user.updateOne({ totalExpenses: totalExpense });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "Error while calling deleteExpense Api" });
  }
}