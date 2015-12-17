angular.module('sequence', [])

  .directive('sequence', function() {
  
  return {
    restrict: 'E',
    link: function(scope, el, atts) {
      el.sequence({
      
        //Homepage Slider
        nextButton: atts.nextButton,
        prevButton: atts.prevButton,
        pagination: atts.pages,
        animateStartingFrameIn: atts.animateStartingFrameIn,
        autoPlay: atts.autoPlay,
        autoPlayDelay: atts.autoPlayDelay,
        preloader: atts.preloader
      });

      }
    }
  });