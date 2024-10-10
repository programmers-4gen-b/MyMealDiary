const express = require('express');
const router = express.Router();
router.use(express.json());
const {
   findProcessedFood,
   saveProcessedFood,
} = require('../../controller/processdFood/ProcessedFoodController');

router.get('/', findProcessedFood);
router.post('/', saveProcessedFood);

module.exports = router;
