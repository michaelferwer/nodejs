/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/Application"],
    function (Application) {
        // Déclaration du controller BasicController pour le module ExampleApp
        Application.controller('IndexController', function IndexController($scope, $http) {

            // Méthode permettant de charger un fichier dans le lecteur video
            $scope.loadingFile = function (event) {
                var size = event.files.length;

                if (size === 0) {
                    console.log("No file to load");
                }
                else {
                    console.log("Loading file in progress");
                    // create blob url
                    var vendorURL = window.URL || window.webkitURL;
                    var player = $("#video");
                    player.get(0).src = vendorURL.createObjectURL(event.files[0]);
                    player.get(0).load();
                    player.get(0).play();
                }

            };

            // Load ChromeCast implementation
            $(document).ready(function () {
                require(['js/chromecast/chromecast'], function (ChromeCast) {
                    var cast = new ChromeCast();
                    $("#session_caster_btn").click(cast.initializeCastAPI);
                    $("#stream_caster_btn").click(cast.requestCastSession);
                    $("#stop_caster_btn").click(cast.stopCast);
                });
            });
        });
    }
);


