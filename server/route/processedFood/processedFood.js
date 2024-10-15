const express = require('express');
const router = express.Router();
router.use(express.json());
const {
   findProcessedFood,
   saveProcessedFood,
   findProcessedFoodDetail,
   deleteProcessedFood,
   updateProcessedFood,
   getAllProcessedFoods,
   getProcessedFoodById,
} = require('../../controller/processdFood/ProcessedFoodController');

router.get('/list', findProcessedFood);
router.get('/list/detail', findProcessedFoodDetail);
router.get('/getFood/all', getAllProcessedFoods);
router.get('/getFood/:id', getProcessedFoodById);

router.post('/', saveProcessedFood);

router.delete('/delete', deleteProcessedFood);

router.put('/update/:id', updateProcessedFood);

module.exports = router;
