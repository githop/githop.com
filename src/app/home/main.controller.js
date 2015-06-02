'use strict';

angular.module('home')
  .controller('MainCtrl', function () {
    var Main = this;

    var attributes = [
      {name: 'Javascript', value: 4},
      {name: 'Ruby', value: 2},
      {name: 'PHP', value: 1},
      {name: 'ANGULRjs', value: 3},
      {name: 'NODE', value: 2},
      {name: 'GULP/GRUNT', value: 2},
      {name: 'HTML', value: 3},
      {name: 'CSS', value: 3},
      {name: 'GIT', value: 2},
      {name: 'LINUX', value: 4},
      {name: 'SQL', value: 3},
      {name: 'TDD', value: 1},
      {name: 'PROTRACTOR', value: 1},
      {name: 'VIM', value: 3},
      {name: 'AUTOMATION', value: 2},
      {name: 'DART', value: 1},
      {name: 'ASYNC/AWAIT', value: 1},
      {name: 'WEBSOCKETS', value: 1}
    ];

    Main.attributes = attributes;
  });
