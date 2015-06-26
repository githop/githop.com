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
        template: [
        '<div ng-repeat="para in header.paragraphs.slice(start -1, end)">',
          '<p>{{para.attributes.body}}</p>',
        '</div>'].join(''),
        scope: {
          header: '=',
          start: '@',
          end: '@'
        }
      }
    }
})();
