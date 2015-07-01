(function (window) {
	'use strict';
	var angular = window.angular;
	angular.module('kpoBlog.blogService', [])
		.factory('BlogFactory', ['$http', function ($http) {
			var BlogFactory = {};
			
			BlogFactory.get = function (bid) {
				return $http.get('/api/' + bid);
			};
			
			BlogFactory.stream = function () {
				return $http.get('/api/blogStream');
			};
			
			return BlogFactory;
			
		}]);
}(window));