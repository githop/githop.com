(function() {
  'use strict';

  angular.module('home')
    .controller('HomeCtrl', HomeCtrl);
  /*ngInject*/
  function HomeCtrl($mdDialog, User, Analysis) {
    var Home = this;

    Home.analyzeWords = analyzeWords;
    Home.loginModal = loginModal;
    Home.logOut = logOut;
    Home.currentUser = User.currentUser();

    var _resultsModal = function(results) {
      var _resultsController = /*ngInject*/ function($mdDialog, analysis) {
        var results = this;
        results.rank = analysis.rank;
        results.words = analysis.words;

        //positive, negative,  neutral
        results.colors = ['#3F51B5', '#F44336', '#f1f1f1'];
        results.chartData = analysis.chartData;
        results.posWc = analysis.posWc;
        results.negWc = analysis.negWc;
        results.neuWc = analysis.neuWc;

        results.close = function() {
          $mdDialog.hide();
        }
      };

      $mdDialog.show({
        controller: _resultsController,
        controllerAs: 'results',
        templateUrl: 'results.tmpl.html',
        parent: angular.element(document.body),
        locals: {analysis: results}
      })
        .then(function() {
          console.log('closed');
        });
    };

    function analyzeWords(words) {
      if (words) {
        Analysis.postWords(words).then(function(results) {
          _resultsModal(results)
        });
      };
    }

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
