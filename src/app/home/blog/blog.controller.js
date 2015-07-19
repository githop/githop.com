/**
 * Created by githop on 6/23/15.
 */
(function() {
  'use strict';
  angular.module('home')
    .controller('BlogCtrl', BlogCtrl);

  /*@ngInject*/
  function BlogCtrl($state, Resources) {
    var Blog = this;

    Blog.posts = Resources.getArticles();
    //public functions
    Blog.goToPost = goToPost;

    function goToPost(id) {
      $state.go('home.blog.post', {postId: id});
    }
  }

})();

