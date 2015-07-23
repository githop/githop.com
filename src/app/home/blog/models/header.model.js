/**
 *
 * Created by githop on 7/18/15.
 */

(function() {
  'use strict';
  angular.module('home')
    .factory('Header', Header);
  /*@ngInject*/
  function Header(Crud) {
    var Model = function(data) {
      if (data) {
        data.paragraphs = [];
        angular.extend(this, data);
      }
    };

    var _pluckIds = function(type, rels) {
      for (var r in rels) {
        if (r === type) {
          return _.pluck(rels[r].data, 'id');
        }
      }
    };

    Model.prototype.getParaIds = function() {
      return _pluckIds('paragraphs', this.relationships);
    };

    Model.prototype.setPara = function(para) {
      if (para) {
        var p = _.find(this.paragraphs, {id: para.id});
        if (!p) {
          this.paragraphs.push(para);
        }
      }
    };

    Model.prototype.edit = function() {
      var self = this;
      Crud.update(self).then(function(header) {
        if (header != undefined) {
          self.attributes.text = header.text;
        }
      });
    };

    return Model;
  }
})();

