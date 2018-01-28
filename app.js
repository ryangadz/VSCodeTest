'use strict';
const http = require("http");
var debug = require('debug');
const port = process.env.PORT || 1337;
var express = require('express');
var path = require('path');

var app = express();

var routes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


