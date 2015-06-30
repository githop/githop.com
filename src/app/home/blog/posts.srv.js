(function () {
  'use strict';
  angular.module('home')
    .factory('Posts', Posts);

  /*@ngInject*/
  function Posts($http, $q, BlogPost, API_URL) {

    var articleManager = {};
    //private properties
    articleManager._pool = [];

    //public methods binding
    articleManager.getPool = getPool;
    articleManager.getArticle = getArticle;
    articleManager.loadAll = loadAll;
    articleManager.setArticle = setArticle;

    //private methods
    var _search = function (articleId) {
      return _.find(articleManager._pool, {'id': articleId});
    };

    var _retrieveInstance = function (articleId, data, afterInit) {
      var instance = _search(articleId);

      if (instance) {
        return instance;
      } else {
        if (afterInit) {
          instance = new BlogPost(data, afterInit);
        } else {
          instance = new BlogPost(data);
        }
        articleManager._pool.push(instance);
      }
      return instance;
    };

    var _load = function (articleId, dfd) {

      $http.get(API_URL + '/articles/' + articleId)
        .success(function (articleData) {
          var article = _retrieveInstance(articleData.data.id, articleData, true);
          dfd.resolve(article);
        })
        .error(function () {
          dfd.reject();
        });
    };

    var _init = function () {
      if (articleManager._pool.length == 0) {
        articleManager.loadAll();
      }
    };

    _init();

    //public methods

    function getPool() {
      return this._pool;
    }

    function getArticle(articleId) {
      var dfd = $q.defer();
      var article = _search(articleId);

      if (article) {
        dfd.resolve(article);
      } else {
        _load(articleId, dfd);
      }

      return dfd.promise;
    }

    function loadAll() {
      var dfd = $q.defer();

      $http.get(API_URL + '/articles')
        .success(function (articlesResp) {
          var posts = [];

          var articles = _.filter(articlesResp.data, function (resource) {
            return resource.type === 'articles';
          });

          var imgs = _.filter(articlesResp.included, function (resource) {
            return resource.type === 'imgs';
          });

          var paragraphs = _.filter(articlesResp.included, function (resource) {
            return resource.type === 'paragraphs';
          });

          var headers = _.filter(articlesResp.included, function (resource) {
            return resource.type === 'headers';
          });

          var authors = _.filter(articlesResp.included, function (resource) {
            return resource.type === 'users'
          });

          _.each(articles, function (articleObj) {
            var title = articleObj.attributes.title;
            var datePosted = articleObj.attributes.posted_on;

            var author = _.filter(authors, function (author) {
              return author.id === articleObj.relationships.user.data.id
            });

            var ownHeaders = _.filter(headers, function (header) {
              return header.relationships.article.data.id === articleObj.id;
            });

            var ownImgs = _.filter(imgs, function (img) {
              return img.relationships.article.data.id === articleObj.id;
            });

            _.each(ownHeaders, function (header) {
              var headerOwnParas = _.filter(paragraphs, function (para) {
                return para.relationships.header.data.id === header.id;
              });
              header.paragraphs = headerOwnParas;
            });

            var post = {
              'id': articleObj.id,
              'title': title,
              'author': author,
              'datePosted': datePosted,
              'headers': ownHeaders,
              'imgs': ownImgs
            };
            var instance = _retrieveInstance(post.id, post);
            posts.push(instance);
          });

          dfd.resolve(posts);
        })
        .error(function () {
          dfd.reject();
        });

      return dfd.promise;
    }

    function setArticle() {
      var article = _search(articleData.id);
      if (article) {
        article.setData(articleData);
      } else {
        article = _retrieveInstance(articleData);
      }

      return article;
    }


    return articleManager;
  }


})();

