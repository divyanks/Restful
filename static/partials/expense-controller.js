'use strict';


angular.module('expApp')
    .controller('ExpenseController', ['$rootScope', '$scope', '$window',
        '$http', '$cookies', '$routeParams', '$location', 'expenseService',
        function ($rootScope, $scope, $window, $http, $cookies, $routeParams, $location, expenseService) {
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.status;
            $scope.expenses = [];
            $rootScope.navbar = true;
            $scope.editingData = [];
            $scope.showFilter = true;

            getExpenses();

            $scope.callGetExpenses = function (url) {
                callGetExpenses(url);
            }
            $scope.getExpenses = function () {
                getExpenses();
            }

            function getExpenses() {
                if ($window.sessionStorage.token) {
                    $http.defaults.headers.common.Authorization = 'Token ' + $window.sessionStorage.token;
                } else {
                    $location.path('/');
                }

                var filter = "";
                filter = "amount__gte=0";
                $scope.fcal = $('#fcalId').val();
                $scope.tcal = $('#tcalId').val();
                if ($scope.gamt && $scope.gamt != "")
                    filter = "amount__gte=" + $scope.gamt;
                if ($scope.lamt && $scope.lamt != "")
                    filter += "&amount__lte=" + $scope.lamt;
                if ($scope.descword && $scope.descword != "")
                    filter += "&desc__icontains=" + $scope.descword;
                if ($scope.commentword && $scope.commentword != "")
                    filter += "&comment__icontains=" + $scope.commentword;
                if ($scope.fcal && $scope.fcal != "")
                    filter += "&date__gte=" + $scope.fcal;
                if ($scope.tcal && $scope.tcal != "")
                    filter += "&date__lte=" + $scope.tcal;
                if (filter == "amount__gte=0")
                    filter = "";
                else
                    filter = "?" + filter;

                callGetExpenses('/api/expenses/' + filter);
            }

            function callGetExpenses(url) {
                $scope.exprev = false;
                $scope.exnext = false;
                $scope.exPrevLink = null;
                $scope.exNextLink = null;

                if (!url || url == "")
                    return;
                $scope.expenses = [];
                expenseService.listExpenses(url).
                success(function (data, status, headers, config) {
                    data.results.forEach(
                        function (dt) {
                            var expense = {
                                'amount': dt.amount,
                                'desc': dt.desc,
                                'comment': dt.comment,
                                'date': dt.date,
                                'time': dt.time,
                                'id': dt.id,
                                "show": true
                            }
                            $scope.expenses.push(expense);
                        });
                    if (data.previous) {
                        $scope.exprev = true;
                        $scope.exPrevLink = data.previous;
                    }
                    if (data.next) {
                        $scope.exnext = true;
                        $scope.exNextLink = data.next;
                    }
                }).
                error(function (data, status, headers, config) {
                   // alert(status);
                });
            }
            $scope.saveAndAddMore = function () {
				if ($scope['amount'] <0) {
					$scope.addError = true;
					var errorMessage = "Amount should be greater 0";
					$scope.message = errorMessage;
					return;
				}
				if ($scope['desc'].length > 200) {
					$scope.addError = true;
					var errorMessage = "Description should be less than 200 charaters";
					$scope.message = errorMessage;
					return;
				}
				if ($scope['comment'].length > 200) {
					$scope.addError = true;
					var errorMessage = "Comment should be less than 200 charaters";
					$scope.message = errorMessage;
					return;
				}
                var dts = $("#pickedDateId").val().split(" ");
                var date = dts[0];
                var time = dts[1];

                var expense = {
                    "amount": $scope['amount'],
                    "desc": $scope['desc'],
                    "comment": $scope['comment'],
                    "date": date,
                    "time": time
                }
                expenseService.saveAndAddMore(expense).
                success(function (data, status, headers, config) {
                    expense = {
                        "amount": data['amount'],
                        "desc": data['desc'],
                        "comment": data['comment'],
                        "date": data['date'],
                        "time": data['time'],
                        "id": data['id'],
                        "show": true
                    }
                    $scope.expenses.push(expense);
                    resetAdd();
                }).
                error(function (data, status, headers, config) {
                   // alert("fail add")
                });
            }

            $scope.add = function () {
				if ($scope['amount'] <0) {
					$scope.addError = true;
					var errorMessage = "Amount should be greater 0";
					$scope.message = errorMessage;
					return;
				}
				if ($scope['desc'].length > 200) {
					$scope.addError = true;
					var errorMessage = "Description should be less than 200 charaters";
					$scope.message = errorMessage;
					return;
				}
				if ($scope['comment'].length > 200) {
					$scope.addError = true;
					var errorMessage = "Comment should be less than 200 charaters";
					$scope.message = errorMessage;
					return;
				}
                var dts = $("#pickedDateId").val().split(" ");
                var date = dts[0];
                var time = dts[1];

                var expense = {
                    "amount": $scope['amount'],
                    "desc": $scope['desc'],
                    "comment": $scope['comment'],
                    "date": date,
                    "time": time
                }
                expenseService.add(expense).success(function (data, status, headers, config) {
                    var expense = {
                        "amount": data['amount'],
                        "desc": data['desc'],
                        "comment": data['comment'],
                        "date": data['date'],
                        "time": data['time'],
                        "id": data['id'],
                        "show": true
                    }
                    $scope.expenses.push(expense);
                    $scope.showAdd = false;
                }).error(function (data, status, headers, config) {
                    //alert("fail add")
                });
            }

            $scope.modify = function (expense) {
                $scope.editingData[expense.id] = true
            }
            $scope.update = function (expense) {
                expenseService.update(expense).success(function (data, status, headers, config) {
                    return $scope.editingData[expense.id] = false
                }).error(function (data, status, headers, config) {
                   // alert("Failure")
                });
            }
            $scope.delete = function (expense) {
                expenseService.delete(expense).success(function (data, status, headers, config) {
                    return expense.show = false;
                }).error(function (data, status, headers, config) {
                   // alert("Failure")
                });
            }

            $scope.doShowAdd = function () {
                $scope.showFilter = false;
                $scope.showAdd = true;
            }
            $scope.doShowFilter = function () {
                $scope.showFilter = true;
                $scope.showAdd = false;
            }

            function resetAdd() {
                $scope['amount'] = "";
                $scope['desc'] = "";
                $scope['comment'] = "";
                $scope['datetime'] = "";
            }
            $scope.resetFilter = function () {
                $scope['lamt'] = "";
                $scope['gamt'] = "";
                $scope['commentword'] = "";
                $scope['descword'] = "";
                $scope['fcal'] = "";
                $scope['tcal'] = "";
                $("#fcalId").val("");
                $("#tcalId").val("");
            }

            $(function () {
                $('#pickedDateId').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm:ss'
                });
                $('#fcalId').datetimepicker({
                    format: 'YYYY-MM-DD'
                });
                $('#tcalId').datetimepicker({
                    format: 'YYYY-MM-DD'
                });
            });
}]);