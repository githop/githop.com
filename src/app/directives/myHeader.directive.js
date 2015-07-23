/**
 * Created by githop on 7/22/15.
 */

(function() {
  angular.module('githopwww')
    .directive('myHeader', myHeader);

  function myHeader() {

    var _ctrl = function(User) {
      var c = this;
      c.canEdit = function() {
        if (User.currentUser()) {
          c.header.edit();
        }
      }
    };

    return {
      restrict: 'EA',
      template: '<h3 ng-click="c.canEdit()">{{c.header.attributes.text}}</h3>',
      scope: {
        header: '='
      },
      controller:/*ngInject*/_ctrl,
      controllerAs: 'c',
      bindToController: true
    }
  }
})();

