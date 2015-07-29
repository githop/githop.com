/**
 * Created by githop on 7/24/15.
 */
(function() {
  'use strict';
  angular.module('githopwww')
    .factory('Updates', Updates);
  /*@ngInject*/
  function Updates($http, $q, $mdToast, appcache) {
    var updates = {};

    var _githubApi = 'https://api.github.com/repos/githop/githop.com/commits?page=1&per_page=1';
    var _latestCommitMessage;
    var _author;
    var _date;
    var _url;
    updates.check = check;

    var _getLatestCommit = function() {
      var dfd = $q.defer();
      $http.get(_githubApi).then(function(resp) {
        _latestCommitMessage = resp.data[0].commit.message;
        _author = resp.data[0].commit.author;
        _date   = _author.date;
        _url    = resp.data[0].html_url;
        dfd.resolve(
          {
            message: _latestCommitMessage,
            author: _author.name,
            date: _date,
            url: _url
          }
        );
      });
      return dfd.promise;
    };

    var _installUpdates = function() {
      return window.location.reload();
    };

    var _toastCtrl = function($mdDialog, data) {
      var c = this;

      c.changeLog = function() {
        var updates = {
          templateUrl: 'updatesDialog.tmpl.html',
          controller: _updatesCtrl,
          controllerAs: 'u',
          locals: {data: data},
          bindToController: true
        };
        $mdDialog.show(updates);
      };

      c.install = _installUpdates;
    };

    var _updatesCtrl = function() {
      var u = this;
      u.install = _installUpdates;
    };

    function check() {
      appcache.checkUpdate().then(function() {
        _getLatestCommit().then(function(data) {
          var toast = {
            templateUrl: 'updateToast.tmpl.html',
            controller:/*@ngInject*/_toastCtrl,
            controllerAs: 'c',
            bindToContoller: true,
            locals: {data: data},
            hideDelay: false
          };
          $mdToast.show(toast);
        });
      });
    }
    return updates;

  }
})();
