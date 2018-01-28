'use strict';
const http = require("http");
var debug = require('debug');
const port = process.env.PORT || 3000;
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

// var server = app.listen(app.get('port'), function () {
//     debug('Express server listening on port ' + server.address().port);
// });

// const handler = (req, res) => {
//     console.log('Server recieved request. ');
//     res.end('Hello World! from vs code and github! yay!!');
// };

//const server = http.createServer(handler);



// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// server.listen(port, err => {
//     if (err){
//         console.log(err);
//     }
//     else {
//         console.log('Server listening on port: ${port}');
//     }
// });
