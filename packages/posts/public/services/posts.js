'use strict';

angular.module('mean.posts').factory('Posts', ['$resource', 
    function($resource) {
       return $resource('posts/:postId', {
          postId: '@_id'
       }, {
       	   update:{
       	   	method: 'PUT'
       	   }
       });
    }
]);


