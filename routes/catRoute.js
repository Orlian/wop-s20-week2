'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController');

const upload = multer({dest: './uploads/'});

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/',upload.single('cat'), (req, res) => {
  console.log(req.body, req.file);
  res.send('With this endpoint you can add cats. (Router)');
});

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit cats. (Router)');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete cats. (Router)');
});

module.exports = router;
