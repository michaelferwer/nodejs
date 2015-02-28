'use strict';

define(
    ['jquery'],
    function($) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // All the File APIs are supported.
            var ChatAPI = function(){
                // Singleton Pattern
                if ( ChatAPI.prototype._singletonInstance ) {
                    return ChatAPI.prototype._singletonInstance;
                }
                ChatAPI.prototype._singletonInstance = this;
            };

            return ChatAPI;
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }
);