/**
 * Created by githop on 6/23/15.
 */

(function () {
  'use strict';
  angular.module('home')
    .factory('BlogPost', BlogPost);

  function BlogPost() {

    var Post = function (article) {
      if (article) {
        this.setData(article);
      }
    };

    Post.prototype.setData = function (articleData) {
      angular.extend(this, articleData);
    };

    return Post;

  }

})();
