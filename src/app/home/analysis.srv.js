/**
 * Created by githop on 7/11/15.
 */

(function() {
  angular.module('home')
    .factory('Analysis', Analysis);
  //@ngInject
  function Analysis($http, $q, API_URL) {
    var Analysis = {};

    Analysis.postWords = postWords;

    var _formatChartData = function(wc) {
      var chartData = [
        {name: 'positive', value: wc.positive},
        {name: 'negative', value: wc.negative},
        {name: 'neutral', value: wc.neutral}
      ];

      return chartData;
    };

    function postWords(words) {
      var dfd = $q.defer();
      $http.post(API_URL + '/analyze', {
        words: words
      }).then(function(resp) {
        var result = {
          chartData: _formatChartData(resp.data.wordCounts),
          rank: resp.data.rank,
          words: resp.data.words,
          posWc: resp.data.wordCounts.positive,
          negWc: resp.data.wordCounts.negative,
          neuWc: resp.data.wordCounts.neutral
        };
        dfd.resolve(result);
      }, function(e) {
        dfd.reject(e)
      });

      return dfd.promise;
    }

    return Analysis;
  }
})();
