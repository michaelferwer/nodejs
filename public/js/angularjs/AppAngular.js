/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/AppServiceAngular"],
    function(){
        var ApplicationApp = angular.module('ApplicationApp',['ngRoute','ngAnimate','ApplicationAppServices']);
        return ApplicationApp;
    }
);