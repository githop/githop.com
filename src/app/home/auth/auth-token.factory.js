/**
 *
 * Created by githop on 6/28/15.
 */

'use strict';

(function () {
  angular.module('githopwww')
    .factory('AuthToken', AuthToken);

    /*ngInject*/
    function AuthToken($window) {
      var key = 'auth-token';
      var store = $window.localStorage;
      var AuthToken = {};

      AuthToken.setToken = function(token) {
        if (token) {
          store.setItem(key, token)
        } else {
          store.removeItem(key);
        }
      };

      AuthToken.getToken = function() {
        return store.getItem(key);
      };

      return AuthToken;
    }
})();

