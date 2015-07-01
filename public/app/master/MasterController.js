(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.masterController', [])
		
		.controller('MasterController', ['MasterFactory', '$stateParams', function (MasterFactory, $stateParams) {
			var self = this;
			
			self.createPost = function () {
				self.message = '';
				
				MasterFactory.create($stateParams.userId, self.blogData)
					.success(function (data) {
						self.blogData = {};
						self.message = data.message;
					});
			};
			
			self.updateUser = function () {
				self.message = '';
				
				MasterFactory.update($stateParams.userId, blogData, $stateParams.blogId)
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