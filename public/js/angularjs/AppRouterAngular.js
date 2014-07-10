/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/AppAngular","js/angularjs/welcome/WelcomeControllerAngular"],
    function(ApplicationApp){
        ApplicationApp.config(function routeProvider ($routeProvider){
            $routeProvider.
            when('/welcome',{
                templateUrl: 'js/angularjs/welcome/welcome-grid-template.html',
                controller: 'BasicController'
            }).
            otherwise({
                redirectTo: ''
            });
        });
    }
);




