var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express3-handlebars');
var debug = require('debug')('generated-express-server');

var server = express();

// port listening
server.set('port', process.env.PORT || 9000);
// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'html');
server.engine('html', expressHbs({
    defaultLayout: 'default.html',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(express.static(__dirname + '/public'));


// Init routes
var routes = require('./routes')(server);


/// catch 404 and forward to error handler
server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
    server.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

server.listen(server.get('port'), function() {
    debug('Express server listening on port ' + this.address().port);
});

module.exports = server;