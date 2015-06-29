(function () {
  'use strict';

  angular.module('home')
    .controller('HomeCtrl', HomeCtrl);
  /*ngInject*/
  function HomeCtrl($mdDialog, User) {
    var Home = this;

    Home.howdy = 'hello world';

    Home.loginModal = loginModal;
    Home.currentUser = User.user;


    function loginModal(ev) {
      $mdDialog.show({
        controller: dialogController,
        controllerAs: 'dialog',
        templateUrl: 'dialog1.tmpl.html',
        parent: angular.element(document.body),
        targetEv: ev
      })
        .then(function(u){
          User.login(u.email, u.password).then(function(user){
            console.log(user);
            console.log(User.user);
          });
        });

      function dialogController($mdDialog) {
        var dialog = this;
        dialog.test = "hello world";

        dialog.login = function(email, password) {
          $mdDialog.hide({email: email, password: password});
        };
        dialog.close = function() {
          $mdDialog.hide();
        };
      }
    }

  }

})();
