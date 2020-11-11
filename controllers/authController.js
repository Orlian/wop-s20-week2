'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');

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

module.exports = {
  login,
};