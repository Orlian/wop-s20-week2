'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', [
    body('name', 'Name needs to be at least 3 characters').trim().isLength({min: 3}).escape(),
    body('email', 'Invalid email').isEmail(),
    body('passwd', 'Invalid password').matches('(?=.*[A-Z]).{8,}'),
], userController.user_create_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit users. (Router)');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users. (Router)');
});

module.exports = router;