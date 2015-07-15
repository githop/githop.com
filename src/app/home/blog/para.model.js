/**
 *
 * Created by githop on 7/15/15.
 */

(function() {
  angular.module('home')
    .factory('Para', Para);
  //ngInject
  function Para($http, $q, $mdDialog, API_URL) {
    var Model = function(data) {
      this.setData(data);
    };

    Model.prototype.setData = function(data) {
      angular.extend(this, data);
    };

    Model.prototype.edit = function() {
      var self = this;

      var _updatePara = function(body) {
        var dfd = $q.defer();
        $http.put(API_URL + '/paragraphs/' + self.id, {
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

      var _editCtrl = function($mdDialog, para) {
        var ctrl = this;
        ctrl.para = para;
        ctrl.cancel = function() {
          $mdDialog.hide();
        };

        ctrl.edit = function(body) {
          _updatePara(body).then(function(body) {
            self.body = body;
            $mdDialog.hide();
          });
        }
      };

      $mdDialog.show({
        controller:/*ngInject*/_editCtrl,
        controllerAs: 'ctrl',
        bindToController: true,
        locals: {para: self},
        templateUrl: 'app/home/blog/post/editDialog.tmpl.html',
        parent: angular.element(document.body)
      });

    };

    return Model;
  }

})();

