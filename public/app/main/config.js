(function (window) {
	'use strict';
	var angular = window.angular;
	angular.module('kpoBlog', ['ui.router', 'ui.bootstrap', 'kpoBlog.blogStream', 'kpoBlog.createPost'])
	
		.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/blog');
			
			$stateProvider
				.state('blog', {
					url: '/blog',
					templateUrl: '/app/blog/partials/blogStream.html'
				})
				.state('login', {
					url: '/login',
					templateUrl: '/app/master/partials/login.html'
				})
				.state('create', {
					url: '/create',
					templateUrl: '/app/master/partials/createPost.html'
				})
				.state('post/1', {
					url: '/post/1',
					templateUrl: '/app/blog/partials/post.html'
				});
		}]);
}(window));