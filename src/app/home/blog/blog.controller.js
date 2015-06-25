/**
 * Created by githop on 6/23/15.
 */
(function () {
  'use strict';
  angular.module('home')
    .controller('BlogCtrl', BlogCtrl);

  /*@ngInject*/
    function BlogCtrl(Posts, $http) {
     var Blog = this;

      Posts.loadAll().then(function(articles){
        Blog.posts = articles;
      });

      Posts.getArticle(2).then(function(article){
        Blog.post = article;
        console.log("here goes nothun",article);
      });

      Posts.getArticle(2).then(function(article){
        Blog.post = article;
        console.log("here goes nothun",article);
      });

    }
})();

