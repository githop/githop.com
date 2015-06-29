/**
 *
 * Created by githop on 6/28/15.
 */

'use strict';
(function () {
  angular.module('githopwww')
    .factory('User', User);

  /*ngInject*/
    function User($http, $q, API_URL, AuthToken, $window) {

      var User = {};
      User.user = '';

      var parseJwt = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      };

      var setCurrentUser = function(token) {
        var user = parseJwt(token);
        User.user = user;
        return user;
      };

      var init = function() {
        if ($window.localStorage['auth-token']) {
          console.log('init call');
          setCurrentUser($window.localStorage.getItem('auth-token'));
        }
      };

      init();

      User.login = function(email, password) {
        var dfd = $q.defer();
        $http.post(API_URL + '/auth/login', {
          data: {
            email: email,
            password: password
          }
        }).then(function success(resp){
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
      };

      return User;
    }
})();
