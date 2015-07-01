(function (window) {
	'use strict';
	var angular = window.angular;
	
	angular.module('kpoBlog.authService', [])
	
		//Factory to Log User In, Verify they are logged in, and Logout.
		.factory('AuthFactory', ['$http', '$q', 'AuthToken', function ($http, $q, AuthToken) {
			var AuthFactory = {};
			
			//Log User In.
			AuthFactory.login = function (username, password) {
				return $http.post('/api/authenticate', {
					username: username,
					password: password
				})
					.success(function (data) {
						AuthToken.setToken(data.token);
						return data;
					});
			};
			
			// Log User Out.
			AuthFactory.logout = function () {
				AuthToken.setToken();
			};
			
			//Check to see if the User is logged In.
			AuthFactory.isLoggedIn = function () {
				if (AuthToken.getToken()) {
					return true;
				} else {
					return false;
				}
			};
		
			return AuthFactory;
			
		}])
		
		//Factory to set the Token and get the Token
		.factory('AuthToken', ['$window', function ($window) {
			var AuthToken = {};
			
			AuthToken.getToken = function () {
				return $window.localStorage.getItem('token');
			};
			
			AuthToken.setToken = function (token) {
				if (token) {
					$window.localStorage.setItem('token', token);
				} else {
					$window.localStorage.removeItem('token');
				}
			};
			
			return AuthToken;
			
		}])
	
		//Factory to add the token to the Header.
		.factory('AuthInterceptor', ['$q', '$location', 'AuthToken', function ($q, $location, AuthToken) {
			var AuthInterceptor = {};
			
			//Adds token to the Header
			AuthInterceptor.request = function (config) {
				var token = AuthToken.getToken();
				
				if (token) {
					config.headers['x-access-token'] = token;
				}
				
				return config;
			};
			
			//If error occurs then clear the token and send to login.
			AuthInterceptor.responseError = function (response) {
				if (response.status === 403) {
					AuthToken.setToken();
					$location.path('/login');
				}
				
				return $q.reject(response);
			};
			
			return AuthInterceptor;
			
		}]);
	
}(window));