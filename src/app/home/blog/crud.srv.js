/**
 *
 * Created by githop on 7/21/15.
 */

(function() {
  angular.module('home')
    .factory('Crud', Crud);
  //ngInject
  function Crud($http, $q, $mdDialog, API_URL) {
    var crudService = {};

    crudService.update = update;

    var _buildDialog = function(self) {
      return function(ctrl) {
        return {
          controller: /*ngInject*/ ctrl,
          controllerAs: 'ctrl',
          bindToController: true,
          locals: {resource: self},
          templateUrl: 'app/home/blog/post/editDialog.tmpl.html',
          parent: angular.element(document.body)
        };
      };
    };

    var _updateResource = function(data, resource) {
      var dfd = $q.defer();
      $http.put(API_URL + '/' + resource.type + '/' + resource.id, data)
        .then(function(resp) {
          dfd.resolve(resp.data.data.attributes);
        }, function(e) {
          dfd.reject(e);
        });
      return dfd.promise;
    };

    var _ctrlBuilder = function(updatefn) {
      return function($mdDialog, resource) {
        var ctrl = this;
        ctrl.type = _.capitalize(resource.type).slice(0, -1);
        ctrl.res = resource;
        ctrl.cancel = function() {
          $mdDialog.hide();
        };

        ctrl.edit = function(attr) {
          updatefn(attr, resource).then(function(attributes) {
            $mdDialog.hide({attributes: attributes});
          });
        }
      }
    };

    function update(self) {
      var dialog;
      var builder = _buildDialog(self);
      if (self.type === 'headers') {
        dialog = builder(_ctrlBuilder(_updateResource));

      } else if (self.type === 'paragraphs') {

        dialog = builder(_ctrlBuilder(_updateResource))
      }

      return $mdDialog.show(dialog);
    }

    return crudService;
  }
})();

