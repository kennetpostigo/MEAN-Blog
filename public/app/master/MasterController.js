(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.masterController', [])
		
		.controller('MasterController', ['MasterFactory', function (MasterFactory, $routeParams) {
			var self = this;
			
			self.createPost = function (id) {
				self.message = '';
				
				MasterFactory.create(id, self.blogData)
					.success(function (data) {
						self.blogData = {};
						self.message = data.message;
					});
			};
			
			self.updateUser = function (id, blogData, bid) {
				self.message = '';
				
				MasterFactory.update($routeParams.user_id, blogData, $routeParams.blog_id)
					.success(function (data) {
						self.blogData = {};
					
						self.message = data.message;
					});
				
			};
			
			self.deleteBlog = function (id, bid) {
				MasterFactory.delete(id, bid)
					.success(function (data) {
						return 'Successfully Deleted Post';
					});
			};
			
		}]);
	
}(window));