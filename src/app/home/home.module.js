/**
 *
 * Created by githop on 5/30/15.
 */

(function () {
  'use strict';
  angular.module('home', ['githopwww'])
    .config(function($stateProvider){
      $stateProvider
        .state('home.main', {
          url:'/',
          templateUrl: 'app/home/home.tmpl.html'
        })
        .state('home.resume', {
          url: '/resume',
          templateUrl: 'app/home/resume/resume.tmpl.html',
          controller: 'ResumeCtrl as Res'
        })
        .state('home.blog', {
          url:'/blog',
          templateUrl: 'app/home/blog/blog.tmpl.html',
          controller: 'BlogCtrl as Blog'
        })
        .state('home.blog.post', {
          url: '/posts/{postId}',
          views: {
            'body@home': {
              templateUrl: function($stateParams) {
                return 'app/home/blog/post/post' + $stateParams.postId + '.tmpl.html';
              },
              controller: 'PostCtrl as Post'
            }
          }
        });
    });
})();

