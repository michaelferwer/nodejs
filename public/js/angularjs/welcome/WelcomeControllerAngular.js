/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/AppAngular"],
    function(ApplicationApp){
        // Déclaration du controller BasicController pour le module ExampleApp
        ApplicationApp.controller('BasicController', function BasicController ($scope, $http, GetHomeTimeline) {
            $scope.List = [];
            $scope.loading = false;

            $scope.scrolled = function(){
                $(window).scroll(function(event) {
                    if ($("body").prop('scrollHeight') <= $("body").scrollTop() + $("body").height() && $scope.loading === false) {
                        $scope.loading = true;
                        GetHomeTimeline.get({},function(data) {
                            $scope.List = $scope.List.concat(data);
                            $scope.loading = false;
                        });
                    }
                });
            }

            GetHomeTimeline.get({},function(data) {
                $scope.List = $scope.List.concat(data);
            });
        });
    }
);


