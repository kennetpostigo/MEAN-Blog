(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.blogController', [])

		.controller('BlogStreamController', ['BlogFactory', 'AuthFactory', function (BlogFactory, AuthFactory) {
			var self = this;
			
			self.loggedIn = AuthFactory.isLoggedIn();
			
			BlogFactory.blogstream()
				.success(function (data) {
					return self.feed = data;
			});
			
		}]);
	
}(window));