/**
 * Created by githop on 6/23/15.
 */
(function () {
  'use strict';
  angular.module('home')
    .controller('BlogCtrl', BlogCtrl);

  /*@ngInject*/
    function BlogCtrl(postsResolved, Posts) {
     var Blog = this;
      Blog.posts = postsResolved;

      Blog.getPost = getPost;
      Blog.logPool = logPool;


      function getPost() {
        Posts.getArticle(id).then(function(post){
          console.log(post);
        });
      }

      function logPool() {
        console.log(Posts.getPool());
      }

    }

})();

