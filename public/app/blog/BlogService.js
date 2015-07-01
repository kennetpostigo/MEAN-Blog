(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.blogService', [])

		.factory('BlogFactory', ['$http', function ($http) {
			
			var BlogFactory = {};
			
			BlogFactory.blogstream = function () {
				return $http.get('/api/blogStream');
			};
			
			BlogFactory.getPost = function (bid) {
				return $http.get('/api/blogStream/' + bid)
			};
			
			return BlogFactory;
			
		}]);
	
}(window));