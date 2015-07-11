/**
 *
 * Created by githop on 7/10/15.
 */

(function () {
  angular.module('githopwww')
    .directive('myRankCard', myRankCard);

  function myRankCard() {
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/rank.tmpl.html',
      scope: {
        sentimentRank: '@',
        positiveWc: '@',
        negativeWc: '@',
        neutralWc: '@'
      }
    }
  }
})();

