const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

app.listen(process.env.PORT, () => {
   console.log(`Server on port number : ${process.env.PORT}.`);
});

const processedFood = require('./route/processedFood/processedFood');
const food = require('./route/food/index');
const user = require('./route/user/user');
const report = require('./route/report/index');

app.use(cors());
app.use(express.json());
app.use('/processedFood', processedFood);
app.use('/food', food);
app.use('/user', user);
app.use('/report', report);
