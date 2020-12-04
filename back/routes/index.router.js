const { Router } = require('express');
const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const ctrlMain = require('../controllers/main.controller');

router.post('/register', ctrlUser.register);
router.post('/auth', ctrlUser.authenticate);
router.post('/basket', ctrlMain.getBasket);
router.get('/books', ctrlMain.getBooks);
router.post('/book', ctrlMain.getBook);
router.post('/basket/insert', ctrlMain.insBasket);
router.post('/basket/delete', ctrlMain.delBasket);
module.exports = router;