/**
 *
 * Created by githop on 5/30/15.
 */

(function () {
  'use strict';
  angular.module('home')
    .controller('ResumeCtrl', ResumeCtrl);
  ResumeCtrl.$inject = [];

  function ResumeCtrl() {
    var Res = this;

    Res.toc = [
      {id: '#intro', icon: 'face', text: 'About'},
      {id: '#exp', icon: 'work', text: 'Experience'},
      {id: '#projects', icon: 'code', text: 'Projects'},
      {id: '#talks', icon: 'group', text: 'Talks'},
      {id: '#competition', icon: 'equalizer', text: 'Competition'},
      {id: '#other', icon: 'build', text: 'Other'},
      {id: '#edu', icon: 'school', text: 'Education'}
    ];

    Res.contactInfo = [
      {link: 'mailto:tom@githop.com', icon: 'email', text: 'tom@githop.com'},
      {link: '#', icon: 'language', text: 'githop.com'},
      {link: 'tel:+1-513-675-4467', icon: 'contact_phone', text: '(513) 675 - 4467'},
      {link: 'https://github.com/githop', text: 'github', immaterial: true}
    ];

    Res.skills = {
      langs: ['JAVASCRIPT', 'RUBY', 'PHP', 'ANGULARjs', 'NODE', 'GULP/GRUNT', 'HTML', 'CSS'],
      other: ['GIT', 'LINUX', 'SQL', 'TDD', 'PROTRACTOR', 'VIM', 'AUTOMATION'],
      learning: ['DART', 'ASYNC / AWAIT', 'WEBSOCKETS']
    };

    var attributes = [
      {name: 'Javascript', value: 2},
      {name: 'Ruby', value: 1},
      {name: 'PHP', value: 0.5},
      {name: 'ANGULRjs', value: 1, text: 'superheroic MVC framework!'},
      {name: 'NODE', value: 1, text: 'JS with streams!'},
      {name: 'GULP/GRUNT', value: 1, text: 'client side build automation'},
      {name: 'HTML', value: 3, text: 'HTML5 rocks!'},
      {name: 'CSS', value: 3, text: 'can fizzBuzz in css'},
      {name: 'GIT', value: 2, text: 'Thanks Linus!'},
      {name: 'LINUX', value: 4, text: 'Ubuntu user since college'},
      {name: 'SQL', value: 3, text: 'Bobby Tables will teach you to sanitize your db inputs!'},
      {name: 'TDD', value: 1, text: 'Rspec, Karma/Jasmine'},
      {name: 'PROTRACTOR', value: 1, text: 'Integration testing'},
      {name: 'VIM', value: 2, text: 'no mouse!'},
      {name: 'AUTOMATION', value: 2, text: 'TravisCI, Teamcity,'},
      {name: 'DART', value: 0.5, text: 'Learning'},
      {name: 'AWS', value: 0.5, text: 'Elastic Beanstalk, S3'},
      {name: 'WEBSOCKETS', value: 0.5, text: 'Learning'}
    ];

    Res.wins = [
      {text: 'Contribute to day to day development on agile team.'},
      {text: 'Designed, developed, implemented  gulp based build and optimization process for angular app.'},
      {text: 'Established use of AngularJS best practices in client apps (Controller As syntax, Module pattern, nested views with ui-router..etc).'},
      {text: 'Implemented automated build process in TeamCity'},
      {text: 'Developed protractor testing plan for angular client apps.'},
      {text: 'Led team discussion and adoption of internal style guide.'}
    ];

    Res.skillsChart = attributes;

    Res.selectedModel = {};

    Res.openToolTip = function (model) {
      console.log('find that pop up');
      Res.selectedModel = model;
    };

    Res.closeToolTip = function () {
      Res.selectedModel = {};
    };

  }
})();

