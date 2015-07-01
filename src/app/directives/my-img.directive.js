/**
 *
 * Created by githop on 6/30/15.
 */

'use strict';

(function () {
  angular.module('githopwww')
    .directive('myImg', myImg);

    function myImg() {
      return {
        restrict: 'EA',
        template: '<img ng-src="{{ctrl.ngSrc}}" alt="{{ctrl.title}}">',
        scope: {
          driveId: '=',
          ngSrc: '=',
          title: '='
        },
        controller: /*ngInject*/ imgController,
        controllerAs: 'ctrl',
        bindToController: true
      };

      function imgController($http) {
        var ctrl = this;
        var _driveUrl = 'https://www.googleapis.com/drive/v2/files/',
            _spinnerPath = 'assets/images/spinner.svg',
            _APIKey = 'AIzaSyB_Gu6uDOCsvVNawWd7WT05F7pqMAnE2O4';

        ctrl.ngSrc = _spinnerPath;

        _driveUrl = _driveUrl + ctrl.driveId;

        $http.get(_driveUrl, {
          params: {
            fields: 'webContentLink',
            key: _APIKey
          }
        }).then(function(resp){
          console.log(resp);
          ctrl.ngSrc = resp.data.webContentLink;
        });


      }
    }
})();

