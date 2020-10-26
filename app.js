'use strict';
const express = require('express');
const catRoute = require('./routes/catRoute');
//const catModel = require('./models/catModel');
const app = express();
const port = 3000;

app.use('/', catRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

