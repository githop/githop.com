/**
 * Created by githop on 6/26/15.
 */

(function () {
  'use strict';

  angular.module('githopwww')
    .directive('myPara', myPara);

    function myPara() {
      return {
        restrict: 'A',
        templateUrl: 'app/directives/myPara.tmpl.html',
        scope: {
          header: '=',
          start: '@',
          end: '@'
        }
      }
    }
})();
