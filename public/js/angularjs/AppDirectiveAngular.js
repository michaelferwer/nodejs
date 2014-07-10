/**
 * Created by michael on 19/04/2014.
 */

'use strict';

define(
    ["js/angularjs/AppAngular"],
    function(AppAngular){
        AppAngular.directive("scrollable", function(){

            return {
                restrict : 'E',
                scope : {
                    'onscroll' : '&onscroll'
                },
//                controller : function($scope){
//                    console.log(this);
//                    $scope.onscroll();
//                },
                link : function link(scope, element, attr){
                    scope.onscroll();
                }
            };
        });
    }
);