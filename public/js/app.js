/**
 * Created by michael on 09/04/2014.
 */


require.config({
    baseUrl: ""
});

// bootstrap of angular application
require(["js/angularjs/AppAngular","js/angularjs/AppRouterAngular","js/angularjs/AppDirectiveAngular"],
    function(){
        angular.bootstrap(document.getElementsByTagName("html")[0],["ApplicationApp"]);
    }
);

require(['js/chromecast/chromecast']);

require(['js/file_api/file_api']);