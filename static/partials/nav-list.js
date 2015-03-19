'use strict';
/**
 *
 */

var navlist = angular.module('mainNavList', []);

navlist.controller('mainNavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'expenses';
        if (currentRoute.match('expenses')) {
            currentRoute = 'expenses';
        } else if (currentRoute.match('reports')) {
            currentRoute = 'reports';
        }
        return page === currentRoute ? 'active' : '';
    };
}]);