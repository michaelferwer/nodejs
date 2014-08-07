/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/Application"],
    function(Application){
        // Déclaration du controller BasicController pour le module ExampleApp
        Application.controller('IndexController', function IndexController ($scope, $http) {

            $scope.webworker = function(){
                // Prepare Web Worker
                var worker = new Worker("js/angularjs/index/encode_file.js");

                worker.onmessage = function(event){
                    console.log("Receive data from webworker : " + event.data);
                };

                worker.onerror = function(){
                    console.log("worker error.");
                };

                worker.postMessage("toto");
            };

            $scope.loadingFile = function(event){
                var size = event.files.length;
                if(size === 0){
                    console.log("No file to load");
                }
                else{
                    console.log("Loading file in progress");
                    // Prepare FileReader
//                    var reader = new FileReader();
//                    reader.onload = function(){
//                        try {
//                            var progress = $("#progress").get(0);
//                            progress.textContent = '100%';
//                            console.log("file is loaded");
//                            var dataURL = this.result;
//                            var player = $("#video");
//                            player.get(0).src = "data:video/webm;base64," + window.btoa(dataURL);
//                            player.get(0).load();
//                            player.get(0).play();
//                        }
//                        catch (e){
//                            console.log(e);
//                        }
//                    };
//                    reader.onprogress = updateProgressBar;
//                    reader.onerror = function(error){
//                        console.log("file loading on error");
//                    };
//                    reader.onabort = function(e){
//                        console.log("file loading is aborted");
//                    };

                    // Prepare Web Worker
                    var worker = new Worker("js/angularjs/index/encode_file.js");
                    worker.onmessage = function(event){
                        console.log("Web Worker finish.");
                        var player = $("#video");
                        player.get(0).src = "data:video/mp4;base64," + event.data;
                        player.get(0).load();
                        player.get(0).play();
                    };

                    worker.onerror = function(){
                        console.log("worker error.");
                    };

                    worker.postMessage(event.files[0]);
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


