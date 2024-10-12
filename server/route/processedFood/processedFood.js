const express = require('express');
const router = express.Router();
router.use(express.json());
const {
   findProcessedFood,
   saveProcessedFood,
   findProcessedFoodDetail,
} = require('../../controller/processdFood/ProcessedFoodController');

router.get('/list', findProcessedFood);
router.get('/list/detail', findProcessedFoodDetail);
router.post('/', saveProcessedFood);

module.exports = router;
