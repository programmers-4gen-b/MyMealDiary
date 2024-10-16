const express = require('express');
const router = express.Router();
const { findFood,findFoodList } = require('../../controller/food/index');

router.get('/list/detail',findFood);
router.get('/list',findFoodList);

module.exports = router;
