const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = require('./utils/db');
const User = require('./models/user');
const Expense = require('./models/expense');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is Successfully Running On PORT:${port}`);
    connection();
})

// Routes
app.use('/user', userRoutes);
app.use('/', expenseRoutes);