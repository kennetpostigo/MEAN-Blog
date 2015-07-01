(function (window) {
	'use strict';
	var angular = window.angular;
	angular.module('kpoBlog.masterService', [])
	
		.factory('MasterFactory', ['$http', function ($http) {
			var MasterFactory = {};
			
			MasterFactory.create = function (id, blogData) {
				return $http.post('/api/' + id + '/create', blogData);
			};
			
			MasterFactory.update = function (id, blogData, bid) {
				return $http.put('/api/' + id + '/blog/' + bid, blogData);
			};
			
			MasterFactory.delete = function (id, bid) {
				return $http.delete('/api/' + id + '/blog/' + bid);
			};
			
			return MasterFactory;
			
		}]);
}(window));