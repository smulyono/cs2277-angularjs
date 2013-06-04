/*
 * Main Application
 *
 * @author : Sanny Mulyono <smulyono@me.com -- http://smulyono.github.io/>
 */
'use strict';

// Declare app level module which depends on filters, and services
var angmodule = angular.module('me.smulyono.timeproject',
    [
     'me.smulyono.timeproject.controllers',
     'me.smulyono.timeproject.services'
    ]);


// Routes
angmodule.config(function($routeProvider, $locationProvider){
    // $locationProvider.html5Mode(true);

    // resolving asynchronous call
    var globalresolve = function($q, ratecardService){
        var deferred = $q.defer();
        ratecardService.resolveRateCard(deferred);
        return deferred.promise;
    };

    $routeProvider
        .when('/timeline',{
            controller : "timelineCtrl",
            templateUrl : "partials/timeline.html",
            resolve : {
                ratecarddata: globalresolve
            }
        })
        .when('/resource',{
            controller : "resourceCtrl",
            templateUrl : "partials/resource.html",
            resolve : {
                ratecarddata: globalresolve
            }
        })
        .when('/resource/:resourceid',{
            controller : "resourceCtrl",
            templateUrl : "partials/resource.html",
            resolve : {
                ratecarddata: globalresolve
            }
        })
        .when('/ratecard',{
            controller : "ratecardCtrl",
            templateUrl : "partials/ratecard.html",
            resolve : {
                ratecarddata: globalresolve
            }
        })
        .otherwise({redirectTo : '/timeline'});
});

// Main init module
angmodule.run(function($rootScope, ratecardService){
    // to simplify, the alert message kept as rootScope
    $rootScope.alertmessage = '';
});

