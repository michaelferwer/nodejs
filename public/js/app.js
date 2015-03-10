/**
 * Created by michael on 09/04/2014.
 */

//
//require.config({
//    baseUrl: "/"
//});
//
////bootstrap of angular application
//require(["js/angularjs/Application","js/angularjs/Router"],
//    function(){
//        angular.bootstrap(document.getElementsByTagName("html")[0],["Application"]);
//    }
//);

// load angularjs
var angular = require('angular');
var angular_route = require('angular-route');

// load jquery
window.$ = window.jQuery = require('jquery');
// load bootstrap
require('bootstrap');

window.Application = require('./angularjs/Application');
require('./angularjs/Router');