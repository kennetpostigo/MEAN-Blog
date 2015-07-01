(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.blogController')

		.controller('BlogPostController', ['BlogFactory', function (BlogFactory, $routeParams) {
			var self = this;
			
			BlogFactory.getPost($routeParams.blog_id)
				.success(function (data) {
					self.blogData = data;
			});
			
		}]);
	
}(window));