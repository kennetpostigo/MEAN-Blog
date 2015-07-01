(function (window) {
    'use strict';
    var angular = window.angular;
    angular.module('kpoBlog.mainController', ['kpoBlog.authService'])
	
        .controller('MainController', ['$rootScope', '$location', 'AuthFactory', function ($rootScope, $location, AuthFactory) {
            var self = this;
			
			self.loggedIn = AuthFactory.isLoggedIn();
			
			$rootScope.$on('$routeChangeStart', function () {
				self.loggedIn = AuthFactory.isLoggedIn();
			});
			
			self.logon = function () {
				self.error = '';
				
				AuthFactory.login(self.loginData.username, self.loginData.password)
					.success(function (data) {
						if (data) {
							$location.path('/create');
						} else {
							self.error = data.message;
						}
					});
			};
			
			self.logout = function () {
				AuthFactory.logout();
				self.user = '';
				
				$location.path('/login');
			};
            
        }]);
}(window));