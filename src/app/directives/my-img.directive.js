/**
 *
 * Created by githop on 6/30/15.
 */

'use strict';

(function () {
  angular.module('githopwww')
    .directive('myImg', myImg);

    function myImg() {
      var _driveUrl = 'https://docs.google.com/uc';
        //'id=ID_HERE&export=download';
      return {
        restrict: 'A',
        scope: {
          driveId: '=',
          ngSrc: '='
        },
        controller: /*ngInject*/ imgController,
        controllerAs: 'imgCtrl',
        bindToController: true
      };

      function imgController($http) {
        var imgCtrl = this;
        console.log("hey oh", this.ngSrc);


      }
    }
})();

