'use strict';

angular.module('githopwww', [
  'ngAnimate', 'ngCookies',
  'ngTouch', 'ngSanitize',
  'ui.router', 'ngMaterial',
  'home', 'duScroll',
  'ngDonut', 'ng-appcache'
])
  .value('duScrollOffset', 70)

  .constant('API_URL', 'http://githop.com')

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, API_URL) {
    $httpProvider.interceptors.push('AuthInterceptor');

    if (API_URL === 'http://githop.com') {
      $compileProvider.debugInfoEnabled(false);
    }

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
