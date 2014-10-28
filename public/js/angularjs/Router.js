/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/Application","js/angularjs/index/IndexController"],
    function(Application){
        Application.config(function routeProvider ($routeProvider){
            $routeProvider.
            when('/',{
                templateUrl: '/js/angularjs/index/index-template.html',
                controller: 'IndexController'
            }).
            when('/movies',{
                templateUrl: '/js/angularjs/movies/movies-template.html',
                controller: ''
            }).
            otherwise({
                redirectTo: ''
            });
        });
    }
);




