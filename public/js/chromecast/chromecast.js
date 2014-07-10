'use strict';

define(
['jquery'],
function($) {

    $( document ).ready(function(){
        var loadCastInterval = setInterval(function(){
            if (chrome && chrome.cast.isAvailable) {
                console.log('Cast has loaded.');
                clearInterval(loadCastInterval);
                initializeCastAPI();

            } else {
                console.log('Unavailable Cast');
            }
        }, 1000);
    });

    var initializeCastAPI = function(){
        var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
        var sessionRequest = new chrome.cast.SessionRequest(applicationID);
        var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
            sessionListener,
            receiverListener);
        chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
        chrome.cast.requestSession(receiverListener, onInitError);
    };

    var sessionListener = function (e) {
        var session = e;
        console.log('New session');
        if (session.media.length != 0) {
            console.log('Found ' + session.media.length + ' sessions.');
        }
    };

    var receiverListener = function (e) {
        if( e === chrome.cast.ReceiverAvailability.AVAILABLE ) {
            console.log("Chromecast was found on the network.");

        }
        else {
            console.log("There are no Chromecasts available.");
        }
    };

    var onInitSuccess = function () {
        console.log("Initialization succeeded");
    };

    var onInitError = function () {
        console.log("Initialization failed");
    };


});