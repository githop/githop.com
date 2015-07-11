/**
 *
 * Created by githop on 7/11/15.
 */

(function() {
  angular.module('home')
    .filter('sentiment', sentiment);

  function sentiment() {
    return function(input) {
      //console.log('in filter', input);
      var out = '';
      switch (input) {
        case 1:
          out = 'positive';
          break;
        case -1:
          out = 'negative';
          break;
        case 0:
          out = 'neutral';
          break;
      }
      return out;
    };
  }
})();

