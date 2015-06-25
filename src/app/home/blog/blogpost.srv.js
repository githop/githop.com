/**
 * Created by githop on 6/23/15.
 */

(function () {
  'use strict';
  angular.module('home')
    .factory('BlogPost', BlogPost);

  function BlogPost() {

    var Post = function(article) {
      if ( article ) {
        this.setData(article);
      }
    };

    Post.prototype.setData = function(articleData) {
      console.log("articleData",  articleData);

      //var title = articleData.title;
      //var headers = _.filter(articleData.included, function(resource){
      //  return resource.type === 'headers';
      //});
      //
      //var paragraphs = _.filter(articleData.included, function(resource){
      //  return resource.type === 'paragraphs';
      //});
      //
      //var imgs = _.filter(articleData.included, function(resource){
      //  return resource.type === 'imgs';
      //});
      //
      //_.each(headers, function( header ) {
      //
      //  var ownParagraphs = _.filter(paragraphs, function(paragraph){
      //    return paragraph.relationships.header.data.id === header.id
      //  });
      //
      //  header.paragraphs = ownParagraphs;
      //});
      //
      //var post = {id: articleData.id, 'title': title, 'headers': headers, 'imgs': imgs};

      angular.extend(this, articleData);

    };

    return Post;

  }

})();
