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
      return function(ctrl, tmpl) {
        return {
          controller: /*ngInject*/ ctrl,
          controllerAs: 'ctrl',
          bindToController: true,
          locals: {resource: self},
          templateUrl: 'app/home/blog/post/' + tmpl,
          parent: angular.element(document.body)
        };
      };
    };

    var _updatePara = function(body, id) {
      var dfd = $q.defer();
      $http.put(API_URL + '/paragraphs/' + id, {
        paragraph: {
          body: body
        }
      }).then(function(resp) {
        dfd.resolve(resp.data.data.attributes.body)
      }, function(e) {
        dfd.reject(e);
      });

      return dfd.promise;
    };

    var _editParaCtrl = function($mdDialog, resource) {
      var ctrl = this;
      ctrl.para = resource;
      ctrl.cancel = function() {
        $mdDialog.hide();
      };

      ctrl.edit = function(body) {
        _updatePara(body, resource.id).then(function(body) {
          $mdDialog.hide({body: body});
        });
      }
    };

    var _updateHeader = function(text, id) {
      var dfd = $q.defer();
      $http.put(API_URL + '/headers/' + id, {
        header: {
          text: text
        }
      }).then(function(resp) {
        dfd.resolve(resp.data.data.attributes.text);
      }, function(e) {
        dfd.reject(e);
      });

      return dfd.promise;
    };

    var _editHeaderCtrl = function($mdDialog, resource) {
      var ctrl = this;
      ctrl.header = resource;

      ctrl.edit = function(text) {
        _updateHeader(text, resource.id).then(function(text) {
          $mdDialog.hide({text: text});
        });
      };
      ctrl.cancel = function() {
        $mdDialog.hide();
      };
    }


    function update(self) {
      var dialog;
      var builder = _buildDialog(self);
      if (self.type === 'headers') {
        dialog = builder(_editHeaderCtrl, 'editHeader.tmpl.html');

      } else if (self.type === 'paragraphs') {

        dialog = builder(_editParaCtrl, 'editPara.tmpl.html')
      }

      return $mdDialog.show(dialog);
    }

    return crudService;
  }
})();

