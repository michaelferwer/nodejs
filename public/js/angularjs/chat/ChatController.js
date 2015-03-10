'use strict';

var RTCPeerConnection;
var RTCSessionDescription;
var RTCIceCandidate;

(function(){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    Application.controller('ChatController', function ChatController ($scope, $http) {

        $scope.localVideo = document.getElementById("local-video");
        $scope.remoteVideo = document.getElementById('remote-video');
        $scope.localStream;
        $scope.localPeerConnection;
        $scope.remotePeerConnection;


        $scope.start = function(){
            console.log('Start local video');
            var constraints = {audio: true, video: true};
            var successCallback = function (stream) {
                $scope.localStream = stream;
                $scope.localVideo.src = window.URL.createObjectURL($scope.localStream);
            };
            var errorCallback = function (error) {
                console.log("navigator.getUserMedia error: ", error);
            };
            navigator.getUserMedia(constraints, successCallback, errorCallback);
        }

        $scope.call = function(){
            console.log('Call starting ...');

            // Chrome
            if (navigator.webkitGetUserMedia) {
                RTCPeerConnection = webkitRTCPeerConnection;
            // Firefox
            } else if(navigator.mozGetUserMedia){
                RTCPeerConnection = mozRTCPeerConnection;
                RTCSessionDescription = mozRTCSessionDescription;
                RTCIceCandidate = mozRTCIceCandidate;
            }

            console.log("RTCPeerConnection object: " + RTCPeerConnection);

            // This is an optional configuration string, associated with
            // NAT traversal setup
            var servers = null;

            // Create the local PeerConnection object
            $scope.localPeerConnection = new RTCPeerConnection(servers);
            console.log("Created local peer connection object localPeerConnection");
            // Add a handler associated with ICE protocol events
            $scope.localPeerConnection.onicecandidate = gotLocalIceCandidate;

            // Create the remote PeerConnection object
            $scope.remotePeerConnection = new RTCPeerConnection(servers);
            console.log("Created remote peer connection object remotePeerConnection");
            // Add a handler associated with ICE protocol events...
            $scope.remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
            // ...and a second handler to be activated as soon as the remote
            // stream becomes available.
            $scope.remotePeerConnection.onaddstream = gotRemoteStream;

            // Add the local stream (as returned by getUserMedia())
            // to the local PeerConnection.
            $scope.localPeerConnection.addStream($scope.localStream);
            console.log("Added localStream to localPeerConnection");

            // We're all set! Create an Offer to be 'sent' to the callee as soon
            // as the local SDP is ready.
            $scope.localPeerConnection.createOffer(gotLocalDescription, onSignalingError);
        }


        function onSignalingError(error){
            console.log('Failed to create signaling message : ' + error.name);
        }

// Handler to be called when the 'local' SDP becomes available
        function gotLocalDescription(description){
// Add the local description to the local PeerConnection
            $scope.localPeerConnection.setLocalDescription(description);
            console.log("Offer from localPeerConnection: \n" + description.sdp);
// ...do the same with the 'pseudoremote' PeerConnection
// Note: this is the part that will have to be changed if you want
// the communicating peers to become remote
// (which calls for the setup of a proper signaling channel)
            $scope.remotePeerConnection.setRemoteDescription(description);
// Create the Answer to the received Offer based on the 'local' description
            $scope.remotePeerConnection.createAnswer(gotRemoteDescription, onSignalingError);
        }


    // Handler to be called when the remote SDP becomes available
        function gotRemoteDescription(description){
    // Set the remote description as the local description of the
    // remote PeerConnection.
            $scope.remotePeerConnection.setLocalDescription(description);
            console.log("Answer from remotePeerConnection: \n" + description.sdp);
    // Conversely, set the remote description as the remote description of the
    // local PeerConnection
            $scope.localPeerConnection.setRemoteDescription(description);
        }

        // Handler to be called as soon as the remote stream becomes available
        function gotRemoteStream(event){
// Associate the remote video element with the retrieved stream
            if (window.URL) {
// Chrome
                $scope.remoteVideo.src = window.URL.createObjectURL(event.stream);
            } else {
// Firefox
                $scope.remoteVideo.src = event.stream;
            }
            console.log("Received remote stream");
        }
// Handler to be called whenever a new local ICE candidate becomes available
        function gotLocalIceCandidate(event){
            if (event.candidate) {
// Add candidate to the remote PeerConnection
                $scope.remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
                console.log("Local ICE candidate: \n" + event.candidate.candidate);
            }
        }
// Handler to be called whenever a new remote ICE candidate becomes available
        function gotRemoteIceCandidate(event){
            if (event.candidate) {
// Add candidate to the local PeerConnection
                $scope.localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
                console.log("Remote ICE candidate: \n " + event.candidate.candidate);
            }
        }

    });
})();


