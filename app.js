
var myApp = angular.module("myApp", ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'sequence', 'AppAnimations']);

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
  $scope.myInterval = 0;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image:['./img/project_screenshots/laptop_tablet_bird2.jpg', './img/homepage-slider/Instagram_slide.jpg', './img/homepage-slider/nature3.jpg', './img/homepage-slider/nature6.jpg'] [slides.length % 4],
      text: [][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
});