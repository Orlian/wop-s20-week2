'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const multer = require('multer');
const catController = require('../controllers/catController');

const fileFilter = (req, file, cb) => {
    if(file.mimetype.includes('image')){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({dest: './uploads/', fileFilter});

const injectFile = (req, res, next) => {
    if(req.file) {
        req.body.mimetype = req.file.mimetype;
    }
    next();
};

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), injectFile, catController.make_thumbnail ,[
    body('name', 'Cat needs a name').trim().isLength({min: 1}),
    body('age', 'Age must be a number').trim().isLength({min: 1}).isInt(),
    body('weight', 'Weight must be a number').trim().isLength({min: 1}).isFloat(),
    body('owner', 'Please select owner').isLength({min: 1}).trim().escape(),
    body('mimetype', 'File needs to be an image').contains('image')
], catController.cat_create_post);

router.put('/',[
    body('name', 'Cat needs a name').not().isEmpty().trim().escape(),
    body('age', 'Age must be a number').trim().isLength({min: 1}).isInt(),
    body('weight', 'Weight must be a number').trim().isLength({min: 1}).isFloat(),
    body('owner', 'Please select owner').isLength({min: 1}).trim().escape(),
], catController.cat_update_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;
