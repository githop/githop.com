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
      console.log(postsResolved);
      Blog.logPool = function() {
        console.log("logging pool", Posts._pool);
      };

      Blog.getPost = function(id) {
        Posts.getArticle(id).then(function(post){
          console.log(post);
        });
      };




    }
})();

