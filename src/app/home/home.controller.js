(function() {
  'use strict';

  angular.module('home')
    .controller('HomeCtrl', HomeCtrl);
  /*ngInject*/
  function HomeCtrl($mdDialog, User) {
    var Home = this;

    Home.loginModal = loginModal;
    Home.logOut = logOut;
    Home.currentUser = User.currentUser();

    function loginModal(ev) {
      $mdDialog.show({
        controller: dialogController,
        controllerAs: 'dialog',
        templateUrl: 'dialog1.tmpl.html',
        parent: angular.element(document.body),
        targetEv: ev
      })
        .then(function(u) {
          User.login(u.email, u.password).then(function(user) {
            Home.currentUser = user;
          });
        });

      /*ngInject*/
      function dialogController($mdDialog) {
        var dialog = this;
        dialog.test = 'hello world';

        dialog.login = function(email, password) {
          $mdDialog.hide({email: email, password: password});
        };
        dialog.close = function() {
          $mdDialog.hide();
        };
      }
    }

    function logOut() {

      Home.currentUser = User.logout();
    }

  }

})();
