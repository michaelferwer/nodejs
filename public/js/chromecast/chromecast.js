'use strict';

define(
['jquery'],
function($) {

    var session = null;

    var initializeCastAPI = function(){

        $( document ).ready(function(){
            var nbError = 0;
            var loadCastInterval = setInterval(function() {
                try {
                    if (chrome.cast.isAvailable) {
                        console.log('Cast has loaded.');
                        clearInterval(loadCastInterval);

                        var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
                        var sessionRequest = new chrome.cast.SessionRequest(applicationID);
                        var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
                            sessionListener,
                            receiverListener);
                        chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);

                    } else {
                        console.log('Unavailable Cast');
                    }
                }
                catch (err) {
                    if (nbError >= 10) {
                        clearInterval(loadCastInterval);
                    }
                    console.log(err);
                    nbError ++;
                }
            }, 1000);

            $("#caster_btn").click(requestCastSession);
        });
    };

    var sessionListener = function (e) {
        session = e;
        if (session.media.length != 0) {
            console.log('Found ' + session.media.length + ' sessions.');
        }
        else{
            console.log('No media session found.');
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

    /**
     *
     */
    var requestCastSession = function(){
        chrome.cast.requestSession(onRequestSessionSuccess, onRequestSessionError);
    };



    /**
     *
     * @param session
     */
    var onRequestSessionSuccess = function(e){
        console.log("onRequestSessionSuccess");
        session = e;

        var mediaInfo = new chrome.cast.media.MediaInfo('http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4', 'video/mp4');

        var request = new chrome.cast.media.LoadRequest(mediaInfo);

        request.autoplay = true;
        request.currentTime = 0;

        session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
    };

    /**
     *
     * @param e
     */
    var onRequestSessionError = function(){
        console.log("Request session failed");
    };


    /**
     *
     */
    var onInitSuccess = function () {
        console.log("Initialization succeeded");
    };

    /**
     *
     */
    var onInitError = function () {
        console.log("Initialization failed");
    };

    /**
     *
     * @param how
     * @param media
     */
    var onMediaDiscovered = function(how, media) {
        console.log("new media session ID:" + media.mediaSessionId);
    };

    /**
     *
     * @param e
     */
    var onMediaError = function(e){
        console.log("Error on Media : "+ e);
    };

    var stopCast = function(){
        session.stop(onStopSuccess, onStopError);
    };

    var onStopSuccess = function(){
        console.log("onStopSuccess");
    };

    var onStopError = function(){
        console.log("onStopError");
    };

    var ChromeCast = function(){ };

    ChromeCast.prototype.initializeCastAPI = initializeCastAPI;

    ChromeCast.prototype.requestCastSession = requestCastSession;

    ChromeCast.prototype.stopCast = stopCast;

    return ChromeCast;

});