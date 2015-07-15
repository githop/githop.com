/**
 * Created by githop on 6/26/15.
 */

(function() {
  'use strict';
  angular.module('githopwww')
    .directive('myPara', myPara);
  //ngInject
  function myPara() {

    var _paraCtrl = function(User) {
      var ctrl = this;

      ctrl.adminShow = function() {
        if (User.currentUser()) {
          return ctrl.canEdit = true
        }
      };
      ctrl.adminHide = function() {
        return ctrl.canEdit = false;
      }
    };

    return {
      restrict: 'A',
      templateUrl: 'app/directives/myPara.tmpl.html',
      scope: {
        header: '=',
        start: '@',
        end: '@'
      },
      controller:/*ngInject*/_paraCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    }
  }
})();
