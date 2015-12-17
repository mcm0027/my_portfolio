angular.module('owl', [])

  .directive('owl', function() {

  return {
    restrict: 'E',
    link: function(scope, el, atts) {
      el.owlCarousel({


        autoPlay : atts.autoPlay,
        stopOnHover : atts.stopOnHover,
        navigation: atts.navigation,
        paginationSpeed : atts.paginationSpeed,
        goToFirstSpeed : atts.goToFirstSpeed,
        singleItem : atts.singleItem,
        autoHeight : atts.autoHeight,
        transitionStyle: atts.transitionStyle,
        items: atts.items
      });

    }
  }
});