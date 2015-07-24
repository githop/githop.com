/**
 *
 * Created by githop on 7/21/15.
 */

(function() {
  'use strict';
  angular.module('home')
    .factory('Crud', Crud);
  //@ngInject
  function Crud($http, $q, $mdDialog, $mdToast, API_URL) {
    var crudService = {};

    crudService.update = update;

    var _buildDialog = function(self) {
      return function(ctrl) {
        return {
          controller:/*@ngInject*/ctrl,
          controllerAs: 'ctrl',
          bindToController: true,
          locals: {resource: self},
          templateUrl: 'app/home/blog/post/editDialog.tmpl.html',
          parent: angular.element(document.body)
        };
      };
    };

    var _ctrlBuilder = function(updateFn) {
      return /*@ngInject*/function($mdDialog, resource) {
        var ctrl = this;
        ctrl.type = _.capitalize(resource.type).slice(0, -1);
        ctrl.copy = angular.copy(resource.attributes);
        ctrl.cancel = function() {
          $mdDialog.hide();
        };

        ctrl.edit = function(attr) {
          updateFn(attr, resource).then(function(data) {
            $mdDialog.hide(data);
          });
        }
      }
    };

    var _updateResource = function(data, resource) {
      var dfd = $q.defer();
      var type = _.capitalize(resource.type).slice(0, -1);
      $http.put(API_URL + '/' + resource.type + '/' + resource.id, data)
        .then(function(resp) {
          var happy = $mdToast.simple().content(type + ' Updated!');
          _handleUpdate({attr: resp.data.data.attributes}, dfd, happy);
        }, function(e) {
          var sad = $mdToast.simple()
            .content('Uh Oh, try again! ' + e.status + ' ' + e.statusText);
          _handleUpdate({error: e, toast: sad}, dfd, sad);
        });
      return dfd.promise;
    };

    var _handleUpdate = function(data, dfd, toast) {
      if (_.isUndefined(data.error)) {
        dfd.resolve(data.attr);
      } else {
        dfd.reject(data.error);
      }
      $mdToast.show(toast);
    };

    function update(self) {
      var builder = _buildDialog(self);
      var dialog = builder(_ctrlBuilder(_updateResource));
      return $mdDialog.show(dialog);
    }

    return crudService;
  }
})();

