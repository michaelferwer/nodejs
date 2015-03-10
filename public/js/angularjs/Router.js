/**
 * Created by michael on 12/04/2014.
 */

'use strict';

//
(function(){
    require('./index/IndexController');
    require('./chat/ChatController');

    Application.config(function ($routeProvider){
        $routeProvider.
            when('/',{
                     templateUrl: '/js/angularjs/index/index-template.html',
                     controller: 'IndexController'
                 }).
            when('/chat',{
                     templateUrl: '/js/angularjs/chat/chat-template.html',
                     controller: 'ChatController'
                 }).
            when('/movies',{
                     templateUrl: '/js/angularjs/movies/movies-template.html',
                     controller: ''
                 }).
            otherwise({
                          redirectTo: ''
                      });
    })
})();

