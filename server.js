var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express3-handlebars');
var debug = require('debug')('generated-express-server');
var mongoose = require('mongoose');

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

/*
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) { throw err; }
});

// Création du schéma pour les commentaires
var videoSchema = new mongoose.Schema({
    name : String
});

// Création du Model pour les commentaires
var videoModel = mongoose.model('video', videoSchema);

// On crée une instance du Model
var video = new videoModel({ name : 'Atinux' });

// On le sauvegarde dans MongoDB !
video.save(function (err) {
    if (err) { throw err; }
    console.log('Video ajouté avec succès !');
    // On se déconnecte de MongoDB maintenant
    mongoose.connection.close();
});
*/

module.exports = server;