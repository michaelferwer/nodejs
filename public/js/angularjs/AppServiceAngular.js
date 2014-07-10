/**
 * Created by michael on 12/04/2014.
 */

'use strict';

define(
    [],
    function(){
        var ApplicationAppServices = angular.module('ApplicationAppServices', ['ngResource']);

        ApplicationAppServices.factory('GetHomeTimeline',
            function ($resource){
                return $resource('http://127.0.0.1:8080/frontend/rest/twitter/homeTimeline',
                    {},
                    {
                        get: {method:'GET', isArray: true}
                    }
                );
            }
        );
        return ApplicationAppServices;
    }
);


