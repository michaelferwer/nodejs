/**
 * Created by michael on 09/04/2014.
 */



require.config({
    baseUrl: "/"
});

//bootstrap of angular application
require(["js/angularjs/Application","js/angularjs/Router"],
    function(){
        angular.bootstrap(document.getElementsByTagName("html")[0],["Application"]);
    }
);
