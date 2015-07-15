/**
 *
 * Created by githop on 6/26/15.
 */

(function () {
  'use strict';

  angular.module('home')
    .controller('PostCtrl', PostCtrl);
  //ngInject
  function PostCtrl($stateParams, Posts) {
    var Post = this;

    Posts.getArticle($stateParams.postId).then(function(post) {
      Post.post = post;
    });

  }

})();

