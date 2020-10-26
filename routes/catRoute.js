'use strict';
// catRoute
const express = require('express');
const catModel = require('../models/catModel');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/cat', (req, res) => {
  res.send('This is the cat endpoint through a router.');
});

router.get('/cat/:id', (req, res) => {
  if(req.params.id <= catModel.cats.length){
    res.send(`You have requested a cat whose id is ${catModel.cats[req.params.id - 1].id} whose name is ${catModel.cats[req.params.id - 1].name}`);
  } else {
    res.send(`You have requested a cat whose id does not exist, sorry...`);
  }

});

router.get('/cat/:id', (req, res) => {
  res.send(`Routed a request to cat with id: ${req.params.id}`);
});

router.post('/cat', (req, res) => {
  res.send('With this endpoint you can add cats. (Router)');
});

router.put('/cat', (req, res) => {
  res.send('With this endpoint you can edit cats. (Router)');
});

router.delete('/cat', (req, res) => {
  res.send('With this endpoint you can delete cats. (Router)')
});

module.exports = router;
