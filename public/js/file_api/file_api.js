'use strict';

define(
    ['jquery'],
    function($) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // All the File APIs are supported.
            var FileAPI = function(){

                // Singleton Pattern
                if ( FileAPI.prototype._singletonInstance ) {
                    return FileAPI.prototype._singletonInstance;
                }
                FileAPI.prototype._singletonInstance = this;


            };

            return FileAPI;
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }
);