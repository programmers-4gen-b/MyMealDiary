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

// 모든 출처와 메소드를 허용하는 CORS 미들웨어 설정
app.use(cors({
   origin : 'http://localhost:3001',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true
}));

app.use(express.json());
app.use('/processedFood', processedFood);
app.use('/food', food);
app.use('/user', user);
app.use('/report', report);
