'use strict';
// diskService to acess the API
angular.module('expApp')
    .factory('loginService', ['$http', function ($http) {

        var urlBase = 'http://localhost:8000/';
        var loginService = {};
        loginService.login = function (logininfo) {
            $http.defaults.headers.common.Authorization = undefined;
            return $http({
                method: 'POST',
                url: '/api/auth/login',
                data: logininfo
            })
        };

        loginService.logout = function () {
            $http.defaults.headers.common.Authorization = undefined;
            return $http({
                method: 'POST',
                url: '/api/auth/logout',
                data: {}
            })

        };
        loginService.registerUser = function (registerInfo) {
            return $http({
                method: 'POST',
                url: '/api/auth/register',
                data: registerInfo
            });
        }


        return loginService;

}]);