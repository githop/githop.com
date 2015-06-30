/**
 * Created by githop on 6/23/15.
 */

(function () {
  'use strict';
  angular.module('home')
    .factory('BlogPost', BlogPost);

  function BlogPost() {

    var Post = function (article, afterInit) {
      afterInit ? this.setData(article, afterInit) : this.setData(article);
    };

    Post.prototype.setData = function (articleData, afterInit) {

      if (!afterInit) {
        angular.extend(this, articleData);
        return;
      }

      var title = articleData.data.attributes.title;

      var datePosted = articleData.data.attributes.posted_on;

      var author = _.filter(articleData.included, function (resource) {
        return resource.type === 'users'
      });

      var imgs = _.filter(articleData.included, function (resource) {
        return resource.type === 'imgs';
      });

      var paragraphs = _.filter(articleData.included, function (resource) {
        return resource.type === 'paragraphs';
      });

      var headers = _.filter(articleData.included, function (resource) {
        return resource.type === 'headers';
      });

      _.each(headers, function (header) {
        var headerOwnParas = _.filter(paragraphs, function (para) {
          return para.relationships.header.data.id === header.id;
        });
        header.paragraphs = headerOwnParas;
      });

      var post = {
        'id': articleData.data.id, 'title': title,
        'author': author, 'datePosted': datePosted,
        'headers': headers, 'imgs': imgs
      };

      angular.extend(this, post);
    };

    return Post;

  }

})();
