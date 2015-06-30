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
      //private properties
      User._user = undefined;

      //public methods binding
      User.login = login;
      User.logout = logout;
      User.currentUser = currentUser;

      //private methods
      var _parseJwt = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      };

      var _setCurrentUser = function(token) {
        User._user = _parseJwt(token);
        return User._user;
      };

      var _init = function() {
        if ($window.localStorage['auth-token']) {
          return _setCurrentUser($window.localStorage.getItem('auth-token'));
        }
      };

      _init();

      function login(email, password) {
        var dfd = $q.defer();
        $http.post(API_URL + '/auth/login', {
          data: {
            email: email,
            password: password
          }
        }).then(function(resp){
          AuthToken.setToken(resp.data.token);
          var user = _setCurrentUser(resp.data.token);
          dfd.resolve(user);
        }, function error(e){
          dfd.reject(e);
        });

        return dfd.promise;
      }

      function logout() {
        AuthToken.setToken();
        return User._user = undefined;
      }

      function currentUser() {
        return User._user;
      }

      return User;
    }
})();
