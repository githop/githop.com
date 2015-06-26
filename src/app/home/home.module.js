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
          templateUrl: 'app/home/home.tmpl.html',
          controller: 'HomeCtrl as Home'
        })
        .state('home.resume', {
          url: '/resume',
          templateUrl: 'app/home/resume/resume.tmpl.html',
          controller: 'ResumeCtrl as Res'
        })
        .state('home.blog', {
          url:'/blog',
          templateUrl: 'app/home/blog/blog.tmpl.html',
          controller: 'BlogCtrl as Blog',
          resolve: {
            postsResolved: function(Posts){
              return Posts.loaded ? Posts.getPool() : Posts.loadAll();
            }
          }
        });
    });
})();

