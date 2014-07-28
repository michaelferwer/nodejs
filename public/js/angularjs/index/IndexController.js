/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/Application"],
    function(Application){
        // Déclaration du controller BasicController pour le module ExampleApp
        Application.controller('IndexController', function IndexController ($scope, $http) {

            $scope.loadingFile = function(event){
                console.log("Loading file in progress");

                var size = event.files.length;
                if(size === 0){
                    console.log("no file to load");
                }
                else{
                    var reader = new FileReader();
                    reader.onload = function(){
                        try {
                            var progress = $("#progress").get(0);
                            progress.textContent = '100%';
                            console.log("file is loaded");
                            var dataURL = this.result;
                            var player = $("#video");
                            player.get(0).src = "data:video/webm;base64," + window.btoa(dataURL);
                            player.get(0).load();
                            player.get(0).play();
                        }
                        catch (e){
                            console.log(e);
                        }
                    };
                    reader.onprogress = updateProgressBar;
                    reader.onerror = function(error){
                        console.log("file loading on error");
                    };
                    reader.onabort = function(e){
                        console.log("file loading is aborted");
                    };

                    var blob = new Blob([
                            "onmessage = function(e) { " +
                            //"console.log(\"worker begin\"); " +
                            "reader.readAsBinaryString(event.files[0]); }"]);
                    var blobURL = window.URL.createObjectURL(blob);
                    var worker = new WebSocket(blobURL);
                    //reader.readAsBinaryString(event.files[0]);
                    worker.postMessage("");
                }
            };

            var updateProgressBar = function(e){
                if (e.lengthComputable) {
                    var percentLoaded = Math.round((e.loaded / e.total) * 100);
                    if (percentLoaded < 100) {
                        var progress = $("#progress").get(0);
                        progress.textContent = percentLoaded + '%';
                    }
                }
            };

            // Load ChromeCast implementation
            $( document ).ready(function() {
                require(['js/chromecast/chromecast'], function(ChromeCast){
                    var cast = new ChromeCast();
                    $("#session_caster_btn").click(cast.initializeCastAPI);
                    $("#stream_caster_btn").click(cast.requestCastSession);
                    $("#stop_caster_btn").click(cast.stopCast);
                });
            });

        });
    }
);


