(function () {
  'use strict';

  angular.module('home')
    .controller('HomeCtrl', HomeCtrl);
  /*ngInject*/
  function HomeCtrl($mdDialog) {
    var Home = this;

    Home.howdy = 'hello world';

    Home.loginModal = loginModal;

    function loginModal(ev) {
      $mdDialog.show({
        controller: dialogController,
        controllerAs: 'dialog',
        templateUrl: 'dialog1.tmpl.html',
        parent: angular.element(document.body),
        targetEv: ev,
      })
        .then(function(loginCreds){
          console.log("modal close",loginCreds)
        });

      function dialogController($mdDialog) {
        var dialog = this;
        dialog.test = "hello world";
        dialog.close = function() {
          $mdDialog.hide(dialog.test);
        }
      }
    }

  }

})();
