'use strict';
// diskService to acess the API
angular.module('expApp').factory('expenseService', ['$http', function ($http) {

    var urlBase = 'http://localhost:8000';

    var expenseService = {};
    // To return the expenses
    expenseService.listExpenses = function (filter) {
        return $http.get(urlBase + '/api/expenses/?' + filter);
    };

    expenseService.update = function (expense) {
        return $http({
            method: 'PATCH',
            url: '/api/expenses/' + expense.id,
            data: expense
        })
    }

    expenseService.delete = function (expense) {
        return $http({
            method: 'delete',
            url: '/api/expenses/' + expense.id,
            data: {}
        })
    }

    expenseService.saveAndAddMore = function (expense) {
        return $http({
            method: 'POST',
            url: '/api/expenses/',
            data: expense
        })
    }
    expenseService.add = function (expense) {
        return $http({
            method: 'POST',
            url: '/api/expenses/',
            data: expense
        })
    }

    return expenseService;
}]);