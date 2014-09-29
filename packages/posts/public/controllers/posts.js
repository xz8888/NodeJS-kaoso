'use strict';

angular.module('mean.posts').controller('PostsController', ['$scope', '$stateParams', 'Global', '$location', 'Posts',
    function($scope, $stateParams, Global, $location, Posts) {
        $scope.global = Global;

        $scope.package = {
            name: 'posts'
        };

        $scope.create = function(isValid){
        	if (isValid){
        		var post = new Posts({
        			title: this.title,
        			content: this.content
                });
	        	console.log(post);

	        	post.$save(function(response){
	        		
	        		$location.path('posts/' + response.id);
	        	});

	        	this.title = '';
	        	this.content = '';
            }
        	else {
               $scope.submitted = true;
            }
        };

        $scope.recent = function(){
            
            Posts.query(function(posts){
                $scope.posts = posts;
            });
        };

        $scope.findOne = function(){
            Posts.get({
                postId: $stateParams.postId
            }, function(post){
                $scope.post = post;
                console.log(post);
            })
        }

    }
]);
