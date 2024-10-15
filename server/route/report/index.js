const express = require('express');
const router = express.Router();
const { mealStore,mealLogStore,calendarLog, findLog } = require('../../controller/report/index');


//POST
router.post('/meal', mealStore);
router.post('/mealLog', mealLogStore);
//GET
router.get('/periodLogs',calendarLog);
router.get('/dayLog',findLog)

module.exports = router;
