'use strict';
// diskService to acess the API
angular.module('expApp')
    .factory('reportService', ['$http', function ($http) {

        var expenseService = {};
        expenseService.listReports = function (type) {
            return $http.get('/api/expenses/reports/?type=' + type)
        };
        return expenseService;

}]);