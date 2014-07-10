/**
 * Created by michael on 08/06/2014.
 */


var initRoutes = function (app)
{
    /// routes
    var routes = require('./routes/index');
    var users = require('./routes/users');

    app.use('/', routes);
    app.use('/users', users);
};


module.exports = initRoutes;