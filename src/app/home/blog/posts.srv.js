/**
 *
 * Created by githop on 6/23/15.
 */

(function () {
  'use strict';
  angular.module('home')
    .factory('Posts', Posts);

  /*@ngInject*/
  function Posts($http, $q, BlogPost) {

    var baseUrl = 'http://localhost:3000/articles';
    var articleManager = {};
    articleManager._pool = {};

    articleManager._retrieveInstance = function(articleId, data) {
      var instance = this._pool[articleId];
      
      if ( instance ) {
        instance.setData();
      } else {
        instance = new BlogPost(data);
        this._pool[articleId] = instance;
      }

      return instance;
    };

    articleManager._search = function(articleId) {
      return this._pool[articleId];
    };

    articleManager._load = function(articleId, dfd) {
      var self = this;

      $http.get(baseUrl + '/' + articleId)
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
        console.log('resolving');
        dfd.resolve(article);
      } else {
        this._load(articleId, dfd);
      }

      return dfd.promise;
    };

    articleManager.loadAll = function() {
      var dfd = $q.defer();
      var self = this;

      $http.get(baseUrl)
        .success(function(articlesResp){
          var posts = [];

          var articles = _.filter(articlesResp.data, function(article){
            return article.type === 'articles';
          });

          var imgs = _.filter(articlesResp.included, function(article){
            return article.type === 'imgs';
          });

          var paragraphs = _.filter(articlesResp.included, function(article){
            return article.type === 'paragraphs';
          });

          var headers = _.filter(articlesResp.included, function(article){
            return article.type === 'headers';
          });


          _.each(articles, function(articleObj){
            var title = articleObj.attributes.title;

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

            var post = { 'id': articleObj.id, 'title': title, 'headers': ownHeaders, 'imgs': ownImgs };
            var instance = new BlogPost(post);
            console.log('blogPost instance', instance);
            posts.push(instance);
          });


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

