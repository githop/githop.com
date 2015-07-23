/**
 *
 * Created by githop on 7/15/15.
 */

(function() {
  angular.module('home')
    .factory('Para', Para);
  //@ngInject
  function Para(Crud) {
    var Model = function(data) {
      this.setData(data);
    };

    Model.prototype.setData = function(data) {
      angular.extend(this, data);
    };

    Model.prototype.edit = function() {
      var self = this;
      Crud.update(self).then(function(para) {
        if (para !== undefined) {
          self.body = para.body;
        }
      })
    };

    return Model;
  }

})();

