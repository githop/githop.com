/**
 * Created by githop on 6/23/15.
 */
(function () {
  'use strict';
  angular.module('home')
    .controller('BlogCtrl', BlogCtrl);

  /*@ngInject*/
    function BlogCtrl($state, postsResolved, Posts) {
     var Blog = this;
      Blog.posts = postsResolved;

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

