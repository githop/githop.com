(function () {
  'use strict';

  angular.module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl() {
    var Home = this;

    Home.howdy = "hello world";

  }

})();
