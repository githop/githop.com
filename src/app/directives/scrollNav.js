/**
 * Created by githop on 5/30/15.
 */


(function () {
  angular.module('githopwww')
    .directive('scrollNav', scrollNav);
    scrollNav.$inject = ['$window', '$$rAF', '$mdConstant'];
    function scrollNav($window, $$rAF, $mdConstant) {

      //var shrink = function(nav, amt, dir, scrlspy) {
      //  $window.requestAnimationFrame(function(){
      //
      //    var thresh = 64;
      //
      //    //console.log('scrySpy in shrink', scrlspy);
      //
      //    //scrolling down
      //    if(dir === 1) {
      //      var _amt = Math.min(thresh, amt);
      //    }
      //    // Scrolling up
      //    else if(dir === -1) {
      //       var _amt = Math.max(0, amt - thresh);
      //
      //    }
      //
      //    _amt = _amt < 0 ? 0 : _amt;
      //    amt = amt < 0 ? 0 : amt;
      //    //console.log('_amt', _amt);
      //    //console.log("amt", amt);
      //    nav[0].style.transform = 'translate3d(0,-' + _amt + 'px, 0)';
      //
      //  });
      //};

      return {
        restrict: 'A',
        link: function(scope, elm, attr) {

          var navElm = angular.element('#my-nav');

          var body = angular.element('#res-col');
          var y = 0;
          var prevScrollTop = 0;
          var shrinkSpeedFactor = 0.5;
          var toolbarHeight;

          toolbarHeight = elm.prop('offsetHeight');

          console.log('toolbar height', toolbarHeight);

          var debouncedContentScroll = $$rAF.throttle(onScroll);

          angular.element($window).on('scroll', debouncedContentScroll);

          function onScroll(e) {
            var scrollTop = e ? this.scrollY : prevScrollTop;

            y = Math.min(
              toolbarHeight / shrinkSpeedFactor,
              Math.max(0, y + scrollTop - prevScrollTop)
            );

            var cssTranslateFactor = y * shrinkSpeedFactor;

            if ( cssTranslateFactor > 64 ) {
              cssTranslateFactor = 64;
            }

            elm.css(
              $mdConstant.CSS.TRANSFORM,
              'translate3d(0,' + (-cssTranslateFactor) + 'px,0)'
            );
            prevScrollTop = scrollTop;

            console.log("css translate factor", cssTranslateFactor)
            console.log("y", y);
            console.log('scrollTtop', scrollTop);
            console.log('prevScrollTtop', prevScrollTop);

          }
          //var start = 0;
          //var shrinkConst;
          //var threshold = 88;
          //var navElm = angular.element('#my-nav');
          //var navH = navElm.height();
          //var scrollSpy = angular.element('#scrollspy');
          //var prev = 0;
          //var delta = 0;
          //var dir = 1;
          //var prevDir = 1;
          //var prevShrinkConst = 0;

          //angular.element($window).bind('scroll', function(){
          //
          //  if ( this.scrollY < 0 ) {
          //    return false;
          //  }
          //
          //  delta = this.scrollY - prev;
          //  dir = delta >= 0 ? 1 : -1;
          //
          //  if ( dir !== prevDir ) {
          //    start = this.scrollY;
          //  }
          //
          //  //console.log('navH, start, scrollY', navH, start, this.scrollY);
          //  //scrolling up
          //  if ( dir === 1 ) {
          //    shrinkConst = navH - Math.max(0, (start + navH) - this.scrollY);
          //    shrink(navElm, shrinkConst, dir, scrollSpy);
          //    prevShrinkConst = Math.min(threshold, shrinkConst)
          //  } else {
          //    shrinkConst = prevShrinkConst - Math.min(threshold, (start - this.scrollY));
          //    shrink(navElm, shrinkConst, dir, scrollSpy);
          //  }
          //
          //  prevDir = dir;
          //  prev = this.scrollY;
          //});
        }
      }
    }
})();
