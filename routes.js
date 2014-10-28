/**
 * Created by michael on 08/06/2014.
 */


var initRoutes = function (app)
{
    /// routes
    var routes = require('./routes/index');
    var users = require('./routes/users');
    var movies = require('./routes/movies');

    app.use('/', routes);
    app.use('/', users);
    app.use('/', movies);
};


module.exports = initRoutes;