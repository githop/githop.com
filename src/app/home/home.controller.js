(function() {
  'use strict';

  angular.module('home')
    .controller('HomeCtrl', HomeCtrl);
  /*ngInject*/
  function HomeCtrl(User, Analysis, Updates) {
    var Home = this;

    Home.analyzeWords = Analysis.analyzeWords;
    Home.login = login;
    Home.logOut = logOut;
    Home.currentUser = User.currentUser();

    //checks to see if appcache has been updated and needs a refresh.
    Updates.check();

    function login() {
      User.login().then(function(user) {
        Home.currentUser = user;
      });
    }

    function logOut() {
      Home.currentUser = User.logout();
    }

  }

})();
