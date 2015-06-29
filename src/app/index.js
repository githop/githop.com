'use strict';

//TODO need to add auth interceptor
//TODO setup auth roles
//TODO login / logout
//TODO add restricted states for create, edit posts
//TODO figure out published / unpublished posts
//TODO implement css for blog header image to scale and maintain aspect ratio

angular.module('githopwww', [
  'ngAnimate', 'ngCookies',
  'ngTouch', 'ngSanitize',
  'ui.router', 'ngMaterial',
  'home', 'duScroll',
  'ngDonut'
])
  .value('duScrollOffset', 70)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        abstract: true,
        views: {
          '@': {
            templateUrl: 'app/home/layout/shell.tmpl.html'
          },
          'nav@home': {
            templateUrl:'app/home/layout/nav.tmpl.html',
            controller:'HomeCtrl as Home'
          },
          'body@home' :  {
            templateUrl: 'app/home/layout/body.tmpl.html'
          }
        },
        controller: 'HomeCtrl as Home'
      });

    $urlRouterProvider.otherwise('/');
  })
;
