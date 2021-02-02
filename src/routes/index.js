const express = require('express');
const route = express.Router();
const userRoute = require('./todos')


route
    .use('/todos', userRoute)

module.exports = route;