'use strict';

define(
    ["js/angularjs/Application"],
    function(Application){
        Application.controller('ChatController', function ChatController ($scope, $http) {

            $scope.startChat = function(){
                console.log("start conf");
            }


            // Load ChromeCast implementation
            //$( document ).ready(function() {
            //    require(['js/chromecast/chromecast'], function(ChromeCast){
            //        var cast = new ChromeCast();
            //        $("#session_caster_btn").click(cast.initializeCastAPI);
            //        $("#stream_caster_btn").click(cast.requestCastSession);
            //        $("#stop_caster_btn").click(cast.stopCast);
            //    });
            //});
        });
    }
);


