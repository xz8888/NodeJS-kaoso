'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'Posts', function ($scope, Global, Posts) {

    $scope.global = Global;

    $scope.up = 100;
    $scope.down = 10;

    $scope.recent = function(){
    	Posts.query(function(posts){
                $scope.posts = posts;
        });
    }
}]);