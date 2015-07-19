/**
 *
 * Created by githop on 7/18/15.
 */

(function() {
  angular.module('home')
    .factory('Header', Header);

  function Header() {
    var Model = function(data) {
      data.paragraphs = [];
      angular.extend(this, data);
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
      this.paragraphs.push(para);
    };

    Model.prototype.getParas = function() {
      //return array of paragraphs
      return this.paragraphs;
    };

    return Model;
  }
})();

