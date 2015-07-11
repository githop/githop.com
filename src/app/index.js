'use strict';

angular.module('githopwww', [
  'ngAnimate', 'ngCookies',
  'ngTouch', 'ngSanitize',
  'ui.router', 'ngMaterial',
  'home', 'duScroll',
  'ngDonut'
])
  .value('duScrollOffset', 70)

  .constant('API_URL', 'http://githop.com')

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('home', {
        abstract: true,
        views: {
          '@': {
            templateUrl: 'app/home/layout/shell.tmpl.html',
            controller: 'HomeCtrl as Home'
          },
          'nav@home': {
            templateUrl: 'app/home/layout/nav.tmpl.html'
          },
          'body@home':  {
            templateUrl: 'app/home/layout/body.tmpl.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
;
