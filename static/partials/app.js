var expApp = angular.module('expApp', ['ngCookies', 'ngResource', 'ngRoute']);
expApp.run(function ($http, $cookies) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
});
expApp.config(
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/static/partials/login.html',
            controller: 'LoginController'
        }).when('/expenses', {
            templateUrl: '/static/partials/expenses-list.html',
            controller: 'ExpenseController'
        }).when('/reports', {
            templateUrl: '/static/partials/reports.html',
            controller: 'ReportController'
        }).when('/register', {
            templateUrl: '/static/partials/register.html',
            controller: 'LoginController'
        }).otherwise({
            redirectTo: '/expenses'
        });
    });
expApp.factory('myHttpInterceptor', [function () {
    var myHttpInterceptor = {
        request: function (config) {
            return config;
        }
    };
    return myHttpInterceptor;
  }]);