'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

passport.use(new Strategy(
    async (username, password, done) => {
      const params = [ussername];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user);
        if(user === undefined) {
          return done(null, false, {message: 'Incorrect email'});
        }
        if(user.password !== password) {
          return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, {...user}, {message: 'Logged in successfully'});
      } catch(e) {
        return done(e);
      }
    }
));
//TODO: JWT strategy for handling bearer token

module.exports = passport;