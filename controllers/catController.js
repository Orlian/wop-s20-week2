'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  const id = req.params.id;
  const cat = await catModel.getCat(id);
  res.json(cat);
};

const cat_create_post = async (req, res) => {
  console.log('Cat create info: ', req.body, req.file);
  const {name, age, weight, owner} = req.body;
  const params = [name, age, weight, owner, req.file.filename];
  await catModel.addCat(params);

  res.json({message: 'upload ok'});
};

const cat_update_put = async (req, res) => {
  const {name, age, weight, owner, id} = req.body;
  const params = [name, age, weight, owner, id];
  await catModel.updateCat(params);

  res.json({message: 'update ok'});
};

const cat_delete = async (req, res) => {
  const id = req.params.id;
  await catModel.deleteCat(id);

  res.json({message: 'delete ok'});
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_create_post,
  cat_update_put,
  cat_delete,
};
