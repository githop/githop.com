/**
 *
 * Created by githop on 6/28/15.
 */

'use strict';
(function () {
  angular.module('githopwww')
    .factory('User', User);

    /*ngInject*/
    function User(AuthToken, API_URL, $http, $q, $window) {

      var User = {};
      User._user = undefined;

      var parseJwt = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      };

      var setCurrentUser = function(token) {
        User._user = parseJwt(token);
        return User._user;
      };

      User.init = function() {
        if ($window.localStorage['auth-token']) {
          return setCurrentUser($window.localStorage.getItem('auth-token'));
        }
      };

      User.init();

      User.login = function(email, password) {
        var dfd = $q.defer();
        $http.post(API_URL + '/auth/login', {
          data: {
            email: email,
            password: password
          }
        }).then(function(resp){
          AuthToken.setToken(resp.data.token);
          var user = setCurrentUser(resp.data.token);
          dfd.resolve(user);
        }, function error(e){
          dfd.reject(e);
        });

        return dfd.promise;
      };

      User.logout = function() {
        AuthToken.setToken();
        return this._user = undefined;
      };

      User.currentUser = function() {
        return this._user;
      };

      return User;
    }
})();
