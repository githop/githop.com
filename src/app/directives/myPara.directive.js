/**
 * Created by githop on 6/26/15.
 */

(function() {
  'use strict';
  angular.module('githopwww')
    .directive('myPara', myPara);
  //@ngInject
  function myPara() {

    var _paraCtrl = function(User) {
      var c = this;

      c.adminShow = function() {
        if (User.currentUser()) {
          return c.canEdit = true
        }
      };
      c.adminHide = function() {
        return c.canEdit = false;
      }
    };

    return {
      restrict: 'A',
      templateUrl: 'app/directives/myPara.tmpl.html',
      scope: {
        header: '=',
        limit: '@',
        start: '@'
      },
      controller:/*@ngInject*/_paraCtrl,
      controllerAs: 'c',
      bindToController: true
    }
  }
})();
