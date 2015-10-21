"use strict";

var App = angular.module("list", ["ui.sortable"]);

App.controller("ListCtrl", function ($scope, $http) {

  $scope.init = function () {
    $http.get('/editlist/api/v1/lists/_all').
      success(function(data, status, headers, config) {
        $scope.model = data;
      }).
      error(function(data, status, headers, config) {
        console.log('Error fetching lists data');
      });

    $scope.show = "All";
    $scope.currentShow = 0;
  };

  $scope.addToList = function () {
    // Prepend to the array
    $scope.model[$scope.currentShow]['entries'].splice(0, 0, $scope.newItem);
    // Clear the Field
    $scope.newItem = "";
  };

  $scope.saveList = function () {
    $http({
        method: 'POST',
        url: '/editlist/api/v1/lists/' + $scope.model[$scope.currentShow].name,
        data: $.param({data: angular.toJson($scope.model[$scope.currentShow]['entries'])}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        $scope.model = data;
      }).
      error(function(data, status, headers, config) {
        console.log('Error fetching lists data');
      });
    $scope.init();
  };

  $scope.deleteList = function (item) {
    var index = $scope.model[$scope.currentShow].list.indexOf(item);
    $scope.model[$scope.currentShow].list.splice(index, 1);
  };

  $scope.listSortable = {
    containment: "parent",
    cursor: "move",
    tolerance: "pointer"
  };

  $scope.changeList = function (i) {
    $scope.currentShow = i;
  };

  $scope.$watch("model", function (newVal, oldVal) {
    if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
      // TODO: implement POST to api to add a list
    }
  }, true);

});
