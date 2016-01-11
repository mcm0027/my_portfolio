var myApp = angular.module("myApp", ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'AppAnimations', 'angularSmoothscroll', 'ngTouch']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/portfolio_items/:item/:type', {
      templateUrl: 'views/portfolio_item.html',
      controller: 'portfolioController'
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

myApp.animation('.animate-filter', ['$timeout', function ($timeout){
  return {
    enter: function (element, done){

      // Add ng-hide for the duration of the animation-delay.
      element.addClass('ng-hide');

      $timeout(function(){
        element.removeClass('ng-hide');
      }, 1000)
      done();
    }
  }
}])

myApp.controller('navController', function ($scope, $routeParams, $location) {
  
  
  $scope.home = function() {
    $('.main-link').hide("slow");
    $('.home-links').show("slow");
    $(".collapse").collapse('hide');
    $location.path('/');
  };
  
  $scope.hideNav = function() {
    $(".collapse").collapse('hide');
  }
});


myApp.controller('homeController', function ($scope, $routeParams, $timeout, projects, $route, skills, $location) {
  $('.main-link').hide();
  
  if($(window).width() < 768) {
    $('.navbar-toggle').show();  
  }
  
  $scope.projects = projects.set();
  $scope.skills = skills.set();
  
  $scope.buttonHide = function(id, type) {
    $('.navbar-toggle').hide();
    $location.path('/portfolio_items/'+ id + '/' + type);
  }

  
  $scope.filter = 'all';

  
  // Listen for resize changes
  window.addEventListener("resize", function() {
    // Get screen size (inner/outerWidth, inner/outerHeight)
    
  }, false);
  
  $scope.wide;
  
  var slides = $scope.slides = [];
  $scope.addSlide = function () {
    var newWidth = 600 + slides.length + 1;
    if($(window).width() > $(window).height()) {
      $scope.wide = true;
      slides.push({
        image: ['./img/homepage-slider/laptop_tablet_bird2-min.jpg', './img/homepage-slider/Instagram_slide.jpg', './img/homepage-slider/data-wide-min.jpg'][slides.length % 3],
        text: [''][slides.length % 3],
        id: ['CSS', 'API', 'data'][slides.length % 3]
      });
      } else {
        $scope.wide = false;
        slides.push({
          image: ['./img/homepage-slider/responsive-slide-xtall-min-sm.jpg', './img/homepage-slider/api-search-xtall-min-sm.jpg', './img/homepage-slider/data-xtall-min-sm.jpg'][slides.length % 3],
          text: [''][slides.length % 3],
          id: ['CSS', 'API', 'data'][slides.length % 3]
        });
    }
  };
  for (var i = 0; i < 3; i++) {
    $scope.addSlide();
    console.log($scope.slides);
  }
  // Listen for resize changes
  window.addEventListener("resize", function() {
  console.log($(window).width());
    if($scope.wide) {
      if($(window).width() < $(window).height()) {
        location.reload(false);
        $scope.wide = false;
      } 
    } else if ($(window).width() > $(window).height()) {
        location.reload(false);
        $scope.wide = true;
      }
    //  location.reload(false);
  }, false);
  
  $scope.setId = function (id) {
    $timeout(function () {
      console.log(id);
      $scope.filter = id;
    }, 800);
  }
    
});


myApp.controller('portfolioController', function ($scope, $routeParams, projects, $route, $location) {
  $('.home-links').hide();
  $(".navbar-toggle").hide();
  $scope.item = $routeParams.item;
  $scope.type = $routeParams.type;
  $scope.projects = projects.set();
  $scope.scroll = function() {
    window.scrollTo(0, 0);
  };
  $scope.buttonHide = function(id, type) {
    $location.path('/portfolio_items/'+ id + '/' + type);
    $(".collapse").collapse('hide');
  }
  
});

myApp.factory('skills', function () {

  var service = {};

  service.set = function () {
    service = {
      html: {
        id: 'html',
        title: 'HTML & HTML5',
        description: 'Understanding of the unique challenges and opportunities that HTML5 has to offer to create readable, semantic code which graceful transitions backward in older browsers.'
      },
      css: {
        id: 'css',
        title: 'CSS3 & Bootstrap',
        description: 'Ability to create responsive and attractive websites from scratch or with the help of Bootstrap templates and styling options to add professional aesthetics quickly.'
      },
      javascript: {
        id: 'javascript',
        title: 'JavaScript & AngularJS',
        description: 'Experience and understanding of Javascript, Angular, and JQuery, as well as how to take advantage of them to integrate APIs and enhance usibility.'
      },
      git: {
        id: 'git',
        title: 'Version Control & Testing',
        description: 'Well versed in using Git/Github as version control as well as end to end and unit testing to provide protection and documentation for projects.'
      }
    }
    return service;
  };
  return service;
});

myApp.factory('projects', function () {

  var service = {};

  service.set = function () {
    service = {
      flappy: {
        id: 'flappy',
        title: 'Bird That Flaps Landing Page',
        description1: 'This is the landing page I created for my game, Bird That Flaps. I  use CSS media queries and conditional statements in JavaScript to make the site responsive for multiple devices and screen sizes. The navbar is loaded as traditional links on desktop and tablet sized screens and as a hamburger dropdown on cell phone sized screens. Different image aspect ratios are loaded depending on the aspect ratio of the device screen. Also, inline CSS styling is included in the header to reduce load times on all devices.',
        description2: 'The site also incorporates some animations using Velocity.js to create a lazy loading effect and a bounce effect on the CTA button to draw attention to the element and reinforce that it is interactive to the user. The carousel is a restyled version of the Slick JQuery plugin, and Jquery Inview is providing inview detection for the animation event triggers. The project demonstrates a responsive design from scratch without the use of a bootstrap template.',
        date: 'October, 2015',
        image: 'bird_that_flaps.PNG',
        type: 'CSS',
        siteName:'flappybird-landingpage/index.html',
        shortTech: 'HTML, CSS and JQuery'
      },
      countries: {
        id: 'countries',
        title: 'Countries and Capitals',
        description1: 'In terms of data manipulation from API calls, this may be my most involved Angular project. This project makes multiple API calls to different services offered by the Geonames website to display a variety of different data about (to my knowledge) every country in the world.',
        description2: 'The initial view provides a brief explanation of the app and the following view is a table displaying every country in alphabetical order with a number of facts about each country. Users can click on specific countries to display information about that country, including the country’s flag and a map of the country, as well as links to neighboring countries. This is done with multiple API calls per page that use the $q and $http Angular services to get information in a factory, which is then passed into controllers specific to each view. Oh, this was also my introduction to unit testing Angular with the Jasmine testing framework.',
        date: 'November, 2015',
        image: 'countries_and_capitals_borderfix.PNG',
        type: 'data',
        siteName: 'c-and-c/index.html',
        shortTech: 'AngularJS, Angular Services, and APIs'
      },
      halloween: {
        id: 'halloween',
        title: 'Halloween Quiz',
        description1: 'This was a particularly fun project, as it deals with one of my favorite holidays and has a pretty lighthearted approach to the user experience. The quiz keeps track of user responses and provides feedback on the fly with the score the user has received so far being updated after every answer.',
        description2: 'The goal here was to provide ample JavaScript functionality to provide a very interactive and enjoyable user experience. The majority of this functionality is provided through conditional statements and JQuery methods to display and hide elements such as new questions and modals indicating the final score. This project may be reworked in the future to add responsive elements, but at this time it’s an exercise in JavaScript and JQuery usage.',
        date: 'October, 2015',
        image: 'Halloween_quiz.PNG',
        type: 'JS',
        siteName:'HweenQuiz/index.html',
        shortTech: 'JavaScript and JQuery'
      },
      first: {
        id: 'first',
        title: 'First Site',
        description1: 'This was one of the first projects for the Thinkful Front-end Web Development program. It was the first real site I made from scratch. Here I use HTML and CSS as well as two JQuery plugins: Chocolat to add a lightbox to my project screenshots and Sticky.js to add sticky functionality to my navbar links.',
        description2: 'Although it is a very basic site functionally, I included it here to demonstrate a pattern of growth and development in my knowledge base and the complexity of my projects over time as well as to demonstrate the ability to incorporate outside code into my own projects effectively.',
        date: 'September, 2015',
        image: 'first_site.PNG',
        type: 'CSS',
        siteName: 'aboutMe/index.html',
        shortTech: 'HTML & CSS'
      },
      amazing: {
        id: 'amazing',
        title: 'Amazing Arbors',
        description1: 'This site was a project done for a small arbor and outdoor construction business. It was a project I started fairly early in my education and went back to as I learned more CSS techniques. Most copy and image resources were provided by the business. I used Bootstrap as well as media queries to make the site responsive. ',
        description2: 'I used a few JQuery plugins for different aspects of the site: the Animsition plugin provides a fade in and fade out animation on page transitions, the Slick carousel plugin is used for the carousel on the homepage, and,  on the gallery page, the Chocolat lightbox plugin is used to display large versions of each thumbnail. Also, Sticky.js is used to create a fixed navbar effect that has alternate styling upon scrolling down.',
        date: 'November, 2015',
        image: 'amazing_arbors.PNG',
        type: 'CSS',
        siteName: 'amazing/index.html',
        shortTech: 'Bootstrap and JQuery'
      },
      instagram: {
        id: 'instagram',
        title: 'Angular Instagram',
        description1: 'This app was my first project using the Angular framework to make API calls. The app makes a call to the Instagram API based on user input and displays images in order of most recently posted in three columns which are linked to the original post on Instagram. On hover, CSS animations are used to scale and translate the images to bring user attention to the image.',
        description2: 'Known issues: The images should have a fade and slide in animation upon search, but this animation loads after the second search performed after a page reload. I have not had time to look into the cause of this issue, but will do so in the future.',
        date: 'November, 2015',
        image: 'angular_instagram.PNG',
        type: 'API',
        siteName: 'instagramAPI/index.html',
        shortTech: 'Angular, APIs, CSS animations'
      },
      hot: {
        id: 'hot',
        title: 'Hot and Cold',
        description1: 'This is a demonstration of effective use of JavaScript logic. Styling for the page was provided by fellow Thinkful student, Jeya Karthika, in order to focus efforts on the JavaScript logic of the project. The site creates a random number between 1 and 100 that is hidden from the user and asks the user to guess the number. Every attempt alerts the user of their accuracy with conditional text indicating whether their new guess is closer or further away from their last guess and how close their guess is in general. When the user guesses correctly, a modal is displayed indicating the number of guesses made and allowing the user to restart. Conditional statements are used to catch invalid input such as numbers over 100 and alert the user.',
        date: 'October, 2015',
        image: 'hot_and_cold2.PNG',
        type: 'JS',
        siteName: 'hot-or-cold/index.html',
        shortTech: 'JavaScript and JQuery'
      },
      karma: {
        id: 'karma',
        title: 'Karma Landing Page',
        description1: 'This was an early project in my Thinkful Front-end Web Development program and the goal was to create a clone of an existing page myself using my newfound CSS and HTML skills. We were tasked with creating as close an emulation of the existing page as possible.',
        description2: 'This is included to demonstrate my growth as a developer as well as an ability to transfer a design into development code faithfully and without creative alterations when the project requires it.',
        date: 'September, 2015',
        image: 'karma_page.PNG',
        type: 'CSS',
        siteName: 'karma/index.html',
        shortTech: 'HTML and CSS'
      },
      ryu: {
        id: 'ryu',
        title: 'Street Fighter App',
        description1: 'This is an early JQuery project that makes heavy use of the library’s mouse and keyboard event methods as well as hide, show, and animate to create an interactive animation of Ryu from the Street Fighter franchise. Many elements are present in the html and being displayed and hidden dynamically based on a number of different interactions by the user.',
        date: 'September, 2015',
        image: 'ryu_JQuery.PNG',
        type: 'JS',
        siteName: 'Street-Fighter/index.html',
        shortTech: 'JavaScript and JQuery'
      },
      shopping: {
        id: 'shopping',
        title: 'Shopping List App',
        description1: 'This was an early use of my developing JQuery skills to create an interactive shopping list app with user interface in mind. The app loads with a number of different list items already displayed, some in the top section with no text-styling and some in the bottom section with line-through styling to help indicate app usage. Labels, button text, and placeholder text are included to ensure the user understands how each aspect of the app works.',
        description2: 'The app provides a clearly labeled text field with placeholder text for entering in new items, buttons to remove or edit individual items, draggable items for easy rearranging, and automatic strikethrough and transfer of items from one section to the other upon checkbox clicks, as well as a button to clear all items from the list and start over. The app also uses a number of media queries set at breakpoints to provide a responsive design on multiple screen sizes.',
        date: 'October, 2015',
        image: 'shopping_list.PNG',
        type: 'JS',
        siteName: 'Shopping/index.html',
        shortTech: 'Responsive CSS and JQuery'
      },
      stack: {
        id: 'stack',
        title: 'Stack Overflow Search',
        description1: 'This search app uses calls to the Stack Overflow API to supply text based results to typed inquiries. The idea is to allow a user to potentially raise their reputation on the site by searching for unanswered questions they may be able to provide answers for, and to find top ranked Stack Overflow members who may provide inspiration for creating an answer the community will deem most helpful.',
        description2: 'The user is able to use two separate search input fields to search for unanswered questions by tag and to search for high ranking users based on their scores for specific tags. Styling and responsive design was not a major concern in this project, as learning to use JQuery and JavaScript to handle API calls and data received from them was the focus of the project.',
        date: 'October, 2015',
        image: 'stack_overflow_AJAX.PNG',
        type: 'API',
        siteName: 'stackerAJAX/index.html',
        shortTech: 'JavaScript, JQuery, and APIs'
      },
      waitstaff: {
        id: 'waitstaff',
        title: 'Waitstaff Calculator',
        description1: 'This app was created using the AngularJS framework to provide a potential tool for waitstaff. The tool allows a user to input the base price of each meal ticket and calculate tax and tip based on percentages. It keeps track of multiple tickets and will display a total in dollars for tips earned so far and the average tip amount, as well as the total number of meal tickets the user has served.',
        description2: 'The main focus of the app was to use AngularJS views and the ngRoute service to display data bound to the view in multiple controllers. The ngAnimate service was also used to trigger subtle fade in animations on view changes.',
        date: 'November, 2015',
        image: 'waitstaff_calculator.PNG',
        type: 'JS',
        siteName: 'WaitstaffCalc/index.html',
        shortTech: 'AngularJS and Angular Services'
      },
      calendar: {
        id: 'calendar',
        title: 'Interactive Calendar',
        description1: 'This calendar has fairly simple usage, but a good deal of logic is going on under the hood. The app allows users to view calendar pages by the month as many as 20 years in the past or future. Data binding to the view updates the title with the currently selected month and year, and ng-class is used to dynamically display a different background image based on the season the selected month falls under. An ng-if attribute conditionally displays a different rhetorical question based on whether the month being viewed is in the past or future. Also, a bit of Bootstrap is used to create some built in styling and responsiveness for a project mainly focused on demonstrating Angular functionality.',
        description2: 'The app uses two separate custom directives. One is restricted to usage as an element and displays the calendar app inside the index page and the other is the date selection table which is restricted to usage as an attribute and is called inside the template for the calendar directive.',
        date: 'December, 2015',
        image: 'calendar_directives.PNG',
        type: 'data',
        siteName: 'angular-js-calendar/index.html',
        shortTech: 'Angular, Custom Directives, and Bootstrap'
      },
      gMaps: {
        id: 'gMaps',
        title: 'Google Maps Global Contact Map',
        description1: "This app takes a mock user's’ contact data from arrays representing JSON information typically found on the server or an outside source and manipulates it to make it more useful. The app is served data including the user’s name and time zone, and the user’s contacts’ name, location, time zone, and the next scheduled meeting or call time the user has with the contact. The app then displays all of the user’s contacts as markers on a map with text boxes complete with name, location, the contact’s current time, and the time of the next scheduled meeting in the user’s time. The app also populates a table with more in depth information, including the next meeting time in the contact’s local time.",
        description2: 'The app uses the Google Maps API to display the map information, Moment.js for timezone conversions, Angular for data manipulation and data binding, and Bootstrap for a bit of built in styling. ',
        date: 'January, 2016',
        image: 'contact_map.PNG',
        type: 'data',
        siteName:'contact_map/index.html',
        shortTech: 'Angular, Google Maps API, and Moment.js'
      }
    }
    return service;
  };
  return service;
});

myApp.factory('paths', function ($location, $route) {

  var service = {
  };

  service.set = function () {
    $('.home-links').hide();  
    service.location = $location.path}
  return service;
});