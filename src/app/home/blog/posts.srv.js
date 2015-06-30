/**
 *
 * Created by githop on 6/23/15.
 */
// loadAll will get entire blog roll then load up object pool with post objects.
// intent is to call this method in the router state and pass data to ctrl via resolve.
// SHOW page for blog will use child state, and use article manager to pass data via resolve as well.
// the above should be super fast because all data was fetched upon init blog load and cached.
//
//edge cases that need to be handled:
// -add method to serialize single response for blog post; e.g. articles/1
// --method should fetch resource, and serialize the response into a BlogPost obj and add it to the _pool
// --logic should prob reside on the BlogPost class
(function () {
  'use strict';
  angular.module('home')
    .factory('Posts', Posts);

  /*@ngInject*/
  function Posts($http, $q, BlogPost, API_URL) {

    var articleManager = {};
    articleManager._pool = [];
    //toggled after loadAll
    articleManager.loaded = false;

    articleManager.getPool = function() {
      return this._pool;
    };

    articleManager._retrieveInstance = function(articleId, data) {
      var instance = this._search(articleId);

      if ( instance ) {
        instance.setData();
      } else {
        instance = new BlogPost(data);
        this._pool.push( instance );
      }

      return instance;
    };

    articleManager._search = function(articleId) {
      var hit = _.find(this._pool, function(article){
        return article.id == articleId;
      });
    };

    articleManager._load = function(articleId, dfd) {
      var self = this;

      $http.get(API_URL + '/articles/' + articleId)
        .success(function(articleData){
          var article = self._retrieveInstance(articleData.data.id, articleData);
          dfd.resolve(article);
        })
        .error(function(){
          dfd.reject();
        });
    };

    articleManager.getArticle = function(articleId) {
      var dfd = $q.defer();
      var article = this._search(articleId);

      if ( article ) {
        dfd.resolve(article);
      } else {
        this._load(articleId, dfd);
      }

      return dfd.promise;
    };

    articleManager.loadAll = function() {
      var dfd = $q.defer();
      var self = this;

      $http.get(API_URL + '/articles')
        .success(function(articlesResp){
          var posts = [];

          var articles = _.filter(articlesResp.data, function(resource){
            return resource.type === 'articles';
          });

          var imgs = _.filter(articlesResp.included, function(resource){
            return resource.type === 'imgs';
          });

          var paragraphs = _.filter(articlesResp.included, function(resource){
            return resource.type === 'paragraphs';
          });

          var headers = _.filter(articlesResp.included, function(resource){
            return resource.type === 'headers';
          });

          var authors = _.filter(articlesResp.included, function(resource){
            return resource.type === 'users'
          });


          _.each(articles, function(articleObj){
            var title = articleObj.attributes.title;
            var datePosted = articleObj.attributes.posted_on;

            var author = _.filter(authors, function(author){
              return author.id === articleObj.relationships.user.data.id
            });

            var ownHeaders = _.filter(headers, function(header){
              return header.relationships.article.data.id === articleObj.id;
            });

            var ownImgs = _.filter(imgs, function(img){
              return img.relationships.article.data.id === articleObj.id;
            });


            _.each(ownHeaders, function(header){
              var headerOwnParas = _.filter(paragraphs, function(para){
                return para.relationships.header.data.id === header.id;
              });
              header.paragraphs = headerOwnParas;
            });


            var post = { 'id': articleObj.id, 'title': title, 'author': author, 'datePosted': datePosted, 'headers': ownHeaders, 'imgs': ownImgs };
            var instance = self._retrieveInstance(post.id, post);
            posts.push(instance);
          });

          self.loaded = true;
          dfd.resolve(posts);
        })
        .error(function(){
          dfd.reject();
        });

      return dfd.promise;
    };

    articleManager.setArticle = function(articleData) {
      var self = this;
      var article = this_.search(articleData.id);
      if ( article ) {
        article.setData(articleData);
      } else  {
        article = self._retrieveInstance(articleData);
      }

      return article;
    };

    return articleManager;
  }




})();

