const express = require('express');
const router = express.Router();
router.use(express.json());

const { login, register,getCalories,setCalories } = require('../../controller/user/UserController');

router.post('/login', login);
router.post('/register', register);
router.get('/calorie',getCalories);
router.put('/calorie',setCalories);

module.exports = router;
