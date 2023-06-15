const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@expensetracker.l8haoiv.mongodb.net/expense?retryWrites=true&w=majority`;

const connection = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Error while connecting Database = ',error);
    }
}

module.exports = connection;