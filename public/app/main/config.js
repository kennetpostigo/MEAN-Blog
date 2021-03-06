(function (window) {
	'use strict';
	var angular = window.angular;
	angular.module('kpoBlog', ['ui.router', 'ui.bootstrap', 'kpoBlog.mainController', 'kpoBlog.authService', 'kpoBlog.blogController', 'kpoBlog.blogService', 'kpoBlog.masterController', 'kpoBlog.masterService'])
	
		.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
			
			$httpProvider.interceptors.push('AuthInterceptor');
			
			$urlRouterProvider.otherwise('/');
			
			$stateProvider
				.state('blog', {
					url: '/',
					templateUrl: '/app/blog/partials/blogStream.html',
//					controller: 'BlogPostController'
				})
				.state('login', {
					url: '/login',
					templateUrl: '/app/master/partials/login.html',
//					controller: 'MainController'
				})
				.state('create', {
					url: '/create/:userId',
					templateUrl: '/app/master/partials/createPost.html',
//					controller: 'MasterController'
				})
				.state('post', {
					url: '/post/:blogId',
					templateUrl: '/app/blog/partials/post.html',
//					controller: 'BlogPostController'
				})
				.state('update', {
					url: '/:userId/blog/:blogId',
					templateUrl: '/app/master/partials/updatePost.html',
//					controller: 'MasterController'
				});
		}]);
}(window));