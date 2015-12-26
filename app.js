var myApp = angular.module("myApp", ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'sequence', 'AppAnimations', 'angularSmoothscroll']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/filter/:id', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/portfolio', {
      templateUrl: 'views/portfolio.html',
      controller: 'portfolioController'
    })
    .when('/portfolio_items/:item/:type', {
      templateUrl: 'views/portfolio_item.html',
      controller: 'portfolioController'
    })
    .when('/about_me', {
      templateUrl: 'views/about_me.html',
      controller: 'aboutMeController'
    })
    .when('/recommendations', {
      templateUrl: 'views/recommendations.html',
      controller: 'recommendationController'
    })
    .otherwise({
      templateUrl: 'views/error404.html'
    });
}]);

myApp.directive('sliderElement', function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/slider.html'
  }
});

myApp.controller('navController', function ($scope, $routeParams, $location, paths, $route) {
  $scope.location = $location.path();
  console.log($scope.location);
  $scope.paths = paths.set();
});


myApp.controller('homeController', function ($scope, $routeParams, $timeout, projects, $location, paths, $route) {
  $scope.location = $location.path();
  $scope.projects = projects.set();
  console.log($scope.projects);
  $scope.paths = paths.set();
  $scope.filter = 'all';
  $scope.myInterval = 0;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  $scope.addSlide = function () {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: ['./img/project_screenshots/laptop_tablet_bird2.jpg', './img/homepage-slider/Instagram_slide.jpg', './img/homepage-slider/nature3.jpg', './img/homepage-slider/nature6.jpg'][slides.length % 4],
      text: ['So responsive and so nice'][slides.length % 4],
      id: ['CSS', 'API', 'data', 'canvas'][slides.length % 4]
    });
  };
  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
    console.log($scope.slides);
  }
  $scope.setId = function (id) {
    $timeout(function () {
      console.log(id);
      $scope.filter = id;
    }, 800);
  }
    
    $scope.setPath = function () {
      $timeout(function () {
        $scope.location = paths.set();
      }, 800);
  }
});

myApp.controller('canvasController', function ($scope) {

  var canvas = document.getElementById("main-canvas");
  var ctx = canvas.getContext("2d");

});

myApp.controller('portfolioController', function ($scope, $routeParams, projects, $location, paths, $route) {
  $scope.location = $location.path();
  console.log($scope.location);
  $scope.item = $routeParams.item;
  $scope.type = $routeParams.type;
  $scope.projects = projects.set();
  $scope.paths = paths.set();
});

myApp.factory('projects', function () {

  var service = {};

  service.set = function () {
    service = {
      flappy: {
        id: 'flappy',
        title: 'Bird That Flaps',
        description1: 'This bird flapppps!?',
        description2: 'This is the falppingest bird',
        image: 'bird_that_flaps.PNG',
        type: 'CSS',
        shortTech: 'HTML & CSS with Bootstrap'
      },
      countries: {
        id: 'countries',
        title: 'Countries and Capitals',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'countries_and_capitals_borderfix.PNG',
        type: 'data',
        type2: 'API',
        shortTech: 'HTML & CSS with Bootstrap'
      },
      halloween: {
        id: 'halloween',
        title: 'Halloween Quiz',
        description1: 'This is a quiz that uses JQuery.',
        description2: 'This is about so many countries. You could poops.',
        image: 'Halloween_quiz.PNG',
        type: 'data',
        shortTech: 'HTML & CSS with Bootstrap'
      },
      first: {
        id: 'first',
        title: 'First Site',
        description1: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        description2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        image: 'first_site.PNG',
        type: 'CSS',
        shortTech: 'HTML &amp; CSS with Bootstrap'
      },
      amazing: {
        id: 'amazing',
        title: 'Amazing Arbors',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'amazing_arbors.PNG',
        type: 'CSS',
        shortTech: 'HTML & CSS with Bootstrap'
      },
      instagram: {
        id: 'instagram',
        title: 'Angular Instagram',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'angular_instagram.PNG',
        type: 'API',
        shortTech: 'AngularJS & Instagram API'
      },
      hot: {
        id: 'hot',
        title: 'Hot and Cold',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'hot_and_cold2.PNG',
        type: 'JS',
        shortTech: 'JavaScript & JQuery'
      },
      karma: {
        id: 'karma',
        title: 'Karma Splash Page',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'karma_page.PNG',
        type: 'CSS',
        shortTech: 'HTML & CSS'
      },
      ryu: {
        id: 'ryu',
        title: 'Ryu JQuery App',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'ryu_JQuery.PNG',
        type: 'JS',
        shortTech: 'JavaScript & JQuery'
      },
      shopping: {
        id: 'shopping',
        title: 'Shopping List App',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'shopping_list.PNG',
        type: 'JS',
        shortTech: 'JavaScript & JQuery'
      },
      stack: {
        id: 'stack',
        title: 'Stack Overflow API',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'stack_overflow_AJAX.PNG',
        type: 'API',
        shortTech: 'JavaScript API calls'
      },
      waitstaff: {
        id: 'waitstaff',
        title: 'Waitstaff Calculator',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'waitstaff_calculator.PNG',
        type: 'JS',
        shortTech: 'AngularJS databinding'
      },
      calendar: {
        id: 'calendar',
        title: 'Interactive Calendar',
        description1: 'This about countries and their capitalssss... what?!!?',
        description2: 'This is about so many countries. You could poops.',
        image: 'calendar_directives.PNG',
        type: 'data',
        shortTech: 'AngularJS data manipulation'
      }
    }
    return service;
  };
  return service;
});

myApp.factory('paths', function ($location, $route) {

  var service = {};

  service.set = function () {
    service.location = $location.path}
  return service;
  $route.reload();
});