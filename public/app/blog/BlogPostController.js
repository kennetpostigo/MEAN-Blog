(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.blogController')

		.controller('BlogPostController', ['BlogFactory','$stateParams', function (BlogFactory, $stateParams) {
			var self = this;
			
			BlogFactory.getPost($stateParams.blogId)
				.success(function (data) {
					self.blogData = data;
				});
			
		}]);
	
}(window));