(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.masterController', [])
		
		.controller('MasterController', ['MasterFactory', 'BlogFactory', '$stateParams', '$location', function (MasterFactory, BlogFactory, $stateParams, $location) {
			var self = this;
			
			self.createPost = function () {
				self.message = '';
				
				MasterFactory.create($stateParams.userId, self.blogData)
					.success(function (data) {
						self.blogData = {};
						self.message = data.message;
						$location.path('/');
					});
			};
			
			BlogFactory.getPost($stateParams.blogId)
				.success(function (data) {
					self.blogData = data;
				});
			
			self.updatePost = function () {
				self.message = '';
				
				MasterFactory.update($stateParams.userId, $stateParams.blogId, self.blogData)
					.success(function (data) {
						self.blogData = {};
						self.message = data.message;
						$location.path('/');
					});
				
			};
			
			self.deleteBlog = function () {
				MasterFactory.delete($stateParams.userId, $stateParams.blogId)
					.success(function (data) {
						$location.path('/');
						return 'Successfully Deleted Post';
					});
			};
			
		}]);
	
}(window));