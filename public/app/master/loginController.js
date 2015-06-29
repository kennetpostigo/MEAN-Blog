(function (window) {
    'use strict';
    var angular = window.angular;
    angular.module('stelaDash.login', [])
        .controller('loginCtrl', [function () {
            var self = this;
            self.submit = function () {
                console.log('user logged with', self.user);
            };
        }]);
}(window));