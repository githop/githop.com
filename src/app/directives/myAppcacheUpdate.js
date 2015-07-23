/**
 *
 * Created by githop on 7/23/15.
 */

(function() {
  angular.module('githopwww')
    .directive('myAppcacheUpdate', myAppcacheUpdate);

  /*@ngInject*/
  function myAppcacheUpdate($window, $mdToast) {
    return {
      restrict: 'EA',
      link: function(scope, elm, attr) {
        if (window.applicationCache) {
          applicationCache.addEventListener('updateready', function() {
            var toast = $mdToast.simple()
              .content('New App Detected. Refresh to update')
              .hideDelay(false);
            $mdToast.show(toast);
          });

        }
      }
    }
  }
})();

