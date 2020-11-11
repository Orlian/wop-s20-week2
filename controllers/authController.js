'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');


const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('login', info);
    if(err || !user) {
      return res.status(400).json({
        message: 'Something went wrong',
        user: user
      });
    }
    req.login(user, {session: false}, (err) => {
      if(err) {
        res.send(err.message);
      }
      const token = jwt.sign(user, 'this_is_a_mega_secret');
      return res.json({user, token});
    });

  })(req, res);
};

const user_create_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req); // TODO require validationResult, see userController

  if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {
    // TODO: bcrypt password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
    const params = [
      req.body.name,
      req.body.username,
      hash, // TODO: save hash instead of the actual password
    ];

    if (await userModel.addUser(params)) {
      next();
    } else {
      res.status(400).json({error: 'register error'});
    }
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  user_create_post,
  logout,
};