/**
 *
 * Created by githop on 7/18/15.
 */


(function() {
  angular.module('home')
    .factory('Article', Article);

  function Article() {
    var Model = function(data) {
      data.author = {};
      data.headers = [];
      data.imgs = [];
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

    Model.prototype.getHeaderIds = function() {
      return _pluckIds('headers', this.relationships);
    };

    Model.prototype.getImgIds = function() {
      return _pluckIds('imgs', this.relationships);
    };

    Model.prototype.getAuthorId = function() {
      return this.relationships.user.data.id;
    };

    Model.prototype.setAuthor = function(author) {
      this.author = author;
    };

    Model.prototype.setHeader = function(header) {
      var h = _.find(this.headers, {id: header.id});
      if (!h) {
        this.headers.push(header);
      }
    };

    Model.prototype.setImg = function(img) {
      var i = _.find(this.imgs, {id: img.id});
      if (!i) {
        this.imgs.push(img);
      }
    };



    return Model;
  }
})();

