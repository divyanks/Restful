'use strict';


angular.module('expApp')
    .controller('LoginController', ['$rootScope', '$scope', '$window', '$http', '$cookies', '$routeParams', '$location', 'loginService',
        function ($rootScope, $scope, $window, $http, $cookies, $routeParams, $location, loginService) {
            $scope.status;
            $rootScope.navbar = false;
            $scope.signError = false;
            $scope.registerError = false;

            $scope.login = function () {

                var logininfo = {
                    'username': $scope['username'],
                    'password': $scope['password']
                }
                loginService.login(logininfo).
                success(function (data, status, headers, config) {
                    $rootScope.user_wel = "Welcome " + $scope['username'] + "!";
                    $window.sessionStorage.token = data['auth_token'];
                    $rootScope.navbar = true;
                    $location.path('/expenses');
                }).
                error(function (data, status, headers, config) {
                    $scope.signError = true;
                    $scope.message = data['non_field_errors'];
                });


            }
            $scope.logout = function () {
                $rootScope.user_wel = "";
                var logininfo = {
                    'username': $scope['username'],
                    'password': $scope['password']
                }

                loginService.logout(logininfo).
                success(function (data, status, headers, config) {
                    $window.sessionStorage.token = "";
                    $location.path('/');
                }).
                error(function (data, status, headers, config) {});
            }

            $scope.register = function () {
                //check if the username or email already present
                if ($scope['rpassword'] != $scope['rrpassword']) {
                    $scope.registerError = true;
                    var errorMessage = "password and retype password dosent match";
                    $scope.message = errorMessage;
                    return;
                }
                var registerInfo = {
                    'username': $scope['rusername'],
                    'email': $scope['remail'],
                    'password': $scope['rpassword']
                }
                loginService.registerUser(registerInfo).
                success(function (data, status, headers, config) {
                    $location.path('/');
                }).
                error(function (data, status, headers, config) {
                    $scope.registerError = true;


                    if (data['username'] != undefined) {
                        errorMessage = "This [" + $scope['rusername'] + "] Username already present ";
                    }


                    $scope.message = errorMessage;
                });
            }
}]);