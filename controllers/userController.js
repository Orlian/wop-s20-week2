'use strict';
//User controller
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.getUser(id);
  res.json(user);
};

const user_create_post = async (req, res) => {
  console.log(req.body);
  const {name, email, passwd} = req.body;
  const params = [name, email, passwd];
  await userModel.addUser(params);

  res.json({message: 'upload ok'});
}

module.exports = {
  user_list_get,
  user_get,
  user_create_post,
};