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

  $scope.addList = function () {
    /*Should prepend to array*/
    $scope.model[$scope.currentShow].list.splice(0, 0, {taskName: $scope.newList, isDone: false });
    /*Reset the Field*/
    $scope.newList = "";
  };

  $scope.saveList = function () {
    $http.post('/editlist/api/v1/lists/' + $scope.model[$scope.currentShow].name ).
      success(function(data, status, headers, config) {
        $scope.model = data;
      }).
      error(function(data, status, headers, config) {
        console.log('Error fetching lists data');
      });
  };

  $scope.deleteList = function (item) {
    var index = $scope.model[$scope.currentShow].list.indexOf(item);
    $scope.model[$scope.currentShow].list.splice(index, 1);
  };

  $scope.listSortable = {
    containment: "parent", //Dont let the user drag outside the parent
    cursor: "move", //Change the cursor icon on drag
    tolerance: "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
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
