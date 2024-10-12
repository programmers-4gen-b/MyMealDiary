const express = require('express');
const router = express.Router();
const { findFood,findFoodList } = require('../../controller/food/index');

router.get('/',findFood);
router.get('/List',findFoodList);

module.exports = router;
