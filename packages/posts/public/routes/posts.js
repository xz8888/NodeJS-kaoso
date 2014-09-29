'use strict';

angular.module('mean.posts').config(['$stateProvider',
    function($stateProvider) {

	    $stateProvider
	       .state('create post', {
	            url: '/post/create',
	            templateUrl: 'posts/views/create.html'
	        })
	       .state('post by id', {
	       	    url: '/posts/:postId',
	       	    templateUrl: 'posts/views/view.html'
	       })
	       .state('posts recent', {
	           url: '/post/recent', 
	           templateUrl: 'posts/views/recent.html'
	       });
    }
]);
