'use strict';
const http = require("http");
var debug = require('debug');
const port = process.env.PORT || 1337;
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const IOTA = require('iota.lib.js');



var app = express();

var routes = require('./routes/index');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(1337, () => console.log('Example app listening on port 1337!'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

// IOTA node
const iota = new IOTA({
	//host: 'http://52.42.145.71', doesnt currently work with iota.api.sendTransfer
    host: 'http://node.iotawallet.info', // iota testnet node
  //  host: 'https://testnet140.tangle.works' ,
    port: 14265
 //  port:443
});

iota.api.getNodeInfo((error, nodeInfo) => {
	if (error) {
		console.error('getNodeInfo error', error)
	} else {
		console.log('getNodeInfo result', nodeInfo)
	}
});

// IOTA seed
var seed = 'W99RJ9M9A9IKOHB9BFGDKLP9CORGD9HHKQ99BNEWUVI9QVQOOVH9GQN9DDFHQJMJT9O9BQOWOMY9EJX9Y' // make your own seed
var options = {
    index: 1,
    checksum: true
};

// IOTA attach and send message
iota.api.getNewAddress(seed, options, function (error, address) {

    // attach the address to the tangle with message
    var transfer = [{
        address: address,
        value: 0,
        message: iota.utils.toTrytes('Hello World! again'),
        tag: ''
    }]

    var depth = 4;

    // on the mainnet, minWeightMagnitude is 18
    var minWeightMagnitude = 18;

    // sendTransfer API wrapper function 
    // includes prepareTransfers, 
    //          attachToTangle, 
    //          broadcast,
    //          storeTransactions 
    iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfer, function (e, attached) {
        if (!e) {
            // console.log("successfully attached", attached);
        }
        else console.log("failed sad face");
    })
});