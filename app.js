var myApp = angular.module("myApp", ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'sequence', 'owl']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

    .when('/', {
    templateUrl: 'views/home.html',
  })
    .when ('/skills/:skill', {
    templateUrl: 'views/skills.html',
    controller: 'skillController'
  })

    .when ('/portfolio', {
    templateUrl: 'views/portfolio.html',
    controller: 'portfolioController'
  })
    .when ('/portfolio_items/:item', {
    templateUrl: 'views/portfolio_item.html',
    controller: 'portfolioController'
  })
    .when ('/about_me', {
    templateUrl: 'views/about_me.html',
    controller: 'aboutMeController'
  })
    .when ('/recommendations', {
    templateUrl: 'views/recommendations.html',
    controller: 'recommendationController'
  })
    .otherwise({
    templateUrl: 'views/error404.html'
  });
}]);

myApp.directive('sliderElement', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/slider.html'
  }
});

myApp.controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
      ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
});