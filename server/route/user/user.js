const express = require('express');
const router = express.Router();
router.use(express.json());

const { login, register } = require('../../controller/user/UserController');

router.post('/login', login);
router.post('/register', register);

module.exports = router;
