/**
 * Created by githop on 6/23/15.
 */
(function () {
  'use strict';
  angular.module('home')
    .controller('BlogCtrl', BlogCtrl);

  /*@ngInject*/
  function BlogCtrl($state, Posts) {
    var Blog = this;

    Blog.posts = Posts.getPool();

    //public functions
    Blog.goToPost = goToPost;

    function goToPost(id) {
      $state.go('home.blog.post', {postId: id});
    }

  }

})();

