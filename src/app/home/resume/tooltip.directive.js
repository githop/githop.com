/**
 * Created by githop on 6/1/15.
 */

(function () {
  'use strict';
  angular.module('home')
    .directive('tooltip', tooltip);

    function tooltip() {
      return {
        restrict: 'EA',
        templateUrl:'app/home/resume/tooltip.tmpl.html',
        require: 'ngModel',
        scope: {
          model: '=ngModel'
        }
      };
    }
})();
