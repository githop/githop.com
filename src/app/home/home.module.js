/**
 *
 * Created by githop on 5/30/15.
 */

(function () {
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
        .state('home.contact', {
          url:'/contact',
          templateUrl: 'app/home/contact.tmpl.html'
        });
    });
})();

