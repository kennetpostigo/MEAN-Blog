(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.blogController', [])

		.controller('BlogStreamController', ['BlogFactory', function (BlogFactory) {
			var self = this;
			
			BlogFactory.blogstream()
				.success(function (data) {
					self.feed = data;
			});
			
		}]);
	
}(window));