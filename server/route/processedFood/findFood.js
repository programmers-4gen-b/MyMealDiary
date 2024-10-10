const express = require('express');
const router = express.Router();
const { findFood } = require('../../controller/processdFood/FindFoodController');

router.get('/', findFood);

module.exports = router;
