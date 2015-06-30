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

      console.log();

      //public functions
      Blog.getPost = getPost;
      Blog.goToPost = goToPost;

      function getPost() {
        Posts.getArticle(id).then(function(post){
          console.log(post);
        });
      }

      function goToPost(id) {
        $state.go('home.blog.post', {postId: id});
      }

    }

})();

