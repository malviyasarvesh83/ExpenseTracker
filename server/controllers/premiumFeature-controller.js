const User = require('../models/user');
const Expense = require('../models/expense');

exports.getUserLeaderBoard = async (req, res) => {
    try {
        const leaderboardOfUsers = await User.find().sort({
          totalExpenses: -1,
        });
        
        res.status(200).json(leaderboardOfUsers);
    } catch (error) {
        res.status(500).json(error);
    }
}