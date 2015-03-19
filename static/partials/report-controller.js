'use strict';


angular.module('expApp')
    .controller('ReportController', ['$scope', '$http', '$rootScope', '$window', '$cookies', '$routeParams', '$location', 'reportService',
        function ($scope, $http, $rootScope, $window, $cookies, $routeParams, $location, reportService) {

            $scope.status;
            $scope.reports = [];
            $rootScope.navbar = true;

            if ($window.sessionStorage.token) {
                $http.defaults.headers.common.Authorization = 'Token ' + $window.sessionStorage.token;
            } else {
                $location.path('/');
            }

            var reportType = $routeParams.type;
            getReport(reportType);

            function getReport(type) {
                if (!type || type == "") {
                    type = "WEEK";
                }

                reportService.listReports(type).
                success(function (data, status, headers, config) {
                    data.results.forEach(
                        function (dt) {
                            var report = {
                                'date': dt.fdate,
                                'total': dt.total,
                                'average': dt.average,
                                'type': dt.type
                            }
                            $scope.reports.push(report);
                            if (type == 'WEEK')
                                $scope.reportMsg = "Weekly expense report"
                            else if (type == 'MONTH')
                                $scope.reportMsg = "Monthly expense report"
                            else if (type == 'YEAR')
                                $scope.reportMsg = "Yearly expense report"
                            else
                                $scope.reportMsg = "Weekly expense report"
                        });
                }).
                error(function (data, status, headers, config) {
                   // alert(status);
                });
            }

            $scope.print = function () {
                window.print();
            }

    }]);