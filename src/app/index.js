'use strict';

//TODO need to add auth interceptor
//TODO setup auth roles
//TODO login / logout
//TODO add restricted states for create, edit posts
//TODO figure out published / unpublished posts

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
            templateUrl:'app/home/layout/nav.tmpl.html'
          },
          'body@home' :  {
            templateUrl: 'app/home/layout/body.tmpl.html'
          }
        },
        controller: 'MainCtrl as Main'
      });

    $urlRouterProvider.otherwise('/');
  })
;
