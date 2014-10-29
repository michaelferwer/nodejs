/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    ["js/angularjs/Application"],
    function(Application){
        // Déclaration du controller BasicController pour le module ExampleApp
        Application.controller('IndexController', function IndexController ($scope, $http) {

            // Méthode permettant de charger un fichier dans le lecteur video
            $scope.loadingFile = function(event){
                var size = event.files.length;

                if(size === 0){
                    console.log("No file to load");
                }
                else{
                    console.log("Loading file in progress");

                    if(true) {
                        // Prepare Web Worker
//                        var worker = new Worker("js/angularjs/index/encode_file.js");
//                        worker.onmessage = function (event) {
//                            console.log("Web Worker finish.");
//                            var player = $("#video");
//                            player.get(0).src = "data:video/mp4;base64," + event.data;
//                            player.get(0).load();
//                            player.get(0).play();
//                        };
//
//                        worker.onerror = function () {
//                            console.log("worker error.");
//                        };
//                        worker.postMessage(event.files[0]);

                        var file = event.files[0];
                        var start = 0;
                        var range = 4194304;
                        var stop = start + range;
                        var fileSize = file.size;
                        var player = $("#video");

                        console.log(fileSize);

                        while(true){
                            console.log("Loading file in progress");
                            var isLastChunk = stop >= fileSize;
                            if (stop >= fileSize)
                                stop = fileSize;

                            var chunk = file.slice(start, stop);

                            var reader = new FileReader();

                            reader.onload = (function(isLast){
                                return function(data){
                                    console.log("chunk");
                                    player.webkitSourceAppend(new Uint8Array(data.target.result));
                                    if(isLast){
                                        player.webkitSourceEndOfStream(HTMLMediaElement.EOS_NO_ERROR);
                                        console.log("File loaded");
                                    }
                                };
                            })(isLastChunk);
                            reader.readAsArrayBuffer(chunk);

                            start = stop;
                            stop = stop + range;

                            if(stop >= fileSize)
                                break;
                        }
                    }
                    else{
                        // create blob url
                        var vendorURL = window.URL || window.webkitURL;
                        var player = $("#video");
                        player.get(0).src = vendorURL.createObjectURL(event.files[0]);
                        player.get(0).load();
                        player.get(0).play();
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


