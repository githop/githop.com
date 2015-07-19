/**
 *
 * Created by githop on 7/18/15.
 */

(function() {
  angular.module('home')
    .factory('Img', Img);

  function Img() {
    var Model = function(data) {
      angular.extend(this, data)
    };

    return Model;
  }
})();
