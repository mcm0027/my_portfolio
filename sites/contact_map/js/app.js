'use strict';

var myApp = angular.module("myApp", []);

myApp.factory('lukeContacts', function () {

  var service = {};
  var now = Date.now();
  var userZone = "America/Lima";
  var meetings = {
    0 : "April 22nd 2015 10:00 am",
    1 : "April 16th 2016 8:30 pm",
    2 : "December 12th 2015 8:00 pm"
  };
  
  var convertMeetings = {
    0 : moment.tz("2015-04-22 10:00", userZone),
    1 : moment.tz("2016-04-16 20:30", userZone),
    2 : moment.tz("2015-12-12 20:00", userZone)
  };
  


  var timeZones = {
    0 : "America/Lima",
    1 : "Europe/London",
    2 : "America/Resolute"
  };
  service.set = function () {
    service = {
          [0]: {
        name: 'Jane',
        location: 'Lima, Peru',
        meetingTime: meetings[0],
        timeZone: timeZones[0],
        contactMeetingTime: (convertMeetings[0].tz(timeZones[0])).format('MMMM Do YYYY, h:mm a'),
        time: (moment.tz(now, 'America/Lima')).format('MMMM Do YYYY, h:mm a')
      }, [1]: {
        name: 'Darius',
        location: "London, England",
        meetingTime: meetings[1],
        timeZone: timeZones[1],
        contactMeetingTime: (convertMeetings[1].tz(timeZones[1])).format('MMMM Do YYYY, h:mm a'),
        time: (moment.tz(now, 'Europe/London')).format('MMMM Do YYYY, h:mm a')
      }, [2]: {
        name: 'Chad',
        location: 'Dallas, Tx',
        meetingTime: meetings[2],
        timeZone: timeZones[2],
        contactMeetingTime: (convertMeetings[2].tz(timeZones[2])).format('MMMM Do YYYY, h:mm a'),
        time: (moment.tz(now, 'America/Resolute')).format('MMMM Do YYYY, h:mm a')
      }
    };
    return service;
  };
  return service;
});

myApp.factory('lindaContacts', function () {

  var service = {};
  var now = Date.now();
  var userZone = "Asia/Seoul";
  var meetings = {
    0 : "December 25th 2016 6:00 am",
    1 : "July 14th 2015 6:00 am",
    2 : "November 8th 2016 9:00 pm"
  };

  var convertMeetings = {
    0 : moment.tz("2016-12-25 06:00", userZone),
    1 : moment.tz("2015-07-14 06:00", userZone),
    2 : moment.tz("2016-11-08 21:00", userZone)
  };

  var timeZones = {
    0 : "America/New_York",
    1 : "Asia/Seoul",
    2 : "Europe/Berlin"
  };

  console.log(convertMeetings[1].clone().tz(timeZones[1]).format());
  console.log(convertMeetings[1].format());
  
  console.log(convertMeetings[0], convertMeetings[1], convertMeetings[2])
  
  console.log(userZone);
  service.set = function () {
    service = {
          [0]: {
        name: 'John',
        location: 'New York, New York',
        meetingTime: meetings[0],
        timeZone: timeZones[0],
        contactMeetingTime: (convertMeetings[0].tz(timeZones[0])).format('MMMM Do YYYY, h:mm a'),
            time: (moment.tz(now, timeZones[0])).format('MMMM Do YYYY, h:mm a')
      }, [1]: {
        name: 'Kelly',
        location: "Seoul, South Korea",
        meetingTime: meetings[1],
        timeZone: timeZones[1],
        contactMeetingTime: (convertMeetings[1].tz(timeZones[1])).format('MMMM Do YYYY, h:mm a'),
        time: (moment.tz(now, timeZones[1])).format('MMMM Do YYYY, h:mm a')
      }, [2]: {
        name: 'Naomi',
        location: 'Frankfurt, Germany',
        meetingTime: meetings[2],
        timeZone: timeZones[2],
        contactMeetingTime: (convertMeetings[2].tz(timeZones[2])).format('MMMM Do YYYY, h:mm a'),
        time: (moment.tz(now, 'Europe/Berlin')).format('MMMM Do YYYY, h:mm a')
      }
    };
    return service;
  };
  return service;
});

myApp.factory('coordinateSearch', ['$http', '$q', function ($http, $q) {
  var service = {};
  service.search = function (address) {
    var deferred = $q.defer();
    $http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=true")
      .success(function (data) {
        deferred.resolve(data);
      });
    return deferred.promise;
  }
  return service;
}]);


myApp.controller('mapController', ['$scope', 'lukeContacts', 'lindaContacts', 'coordinateSearch', function ($scope, lukeContacts, lindaContacts, coordinateSearch) {

  $scope.results = [];
  $scope.contact = [];
  $scope.size = 0;
  $scope.markers = [];
  $scope.infoWindows = [];
  $scope.time = [];  
  $scope.map;
  $scope.mapUpdate = function () {
    var myCenter = new google.maps.LatLng(0, 0);


    function initialize() {
      var mapProp = {
        center: myCenter,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);


      $('#show').on('click', function () {
        $scope.show();
      });

      $scope.show = function () {
        $scope.hide();

        $scope.markerSet = function () {
          for (var i = 0; i < $scope.contact.length / 2; i++) {
            var a = i * 2;
            var b = a + 1;
console.log($scope.contact[a]);
            var content = "<div><p>Name: " + $scope.user[i].name + "</p><p>Location: " + $scope.user[i].location + "</p><p>Next Meeting: " + $scope.user[i].meetingTime + "</p><p>Current Time: " + $scope.user[i].time + "</p></div>"
            addMarker({
              lat: $scope.contact[a].lat,
              lng: $scope.contact[b].lng
            });
            
            
            function addMarker(location) {
           
              $scope.marker = new google.maps.Marker({
                position: location,
                map: $scope.map,
                title: $scope.user[i].name
              });
              
              $scope.infoWindow = new google.maps.InfoWindow({
                content: content,
                position: location 
              });
              
              $scope.infoWindow.open($scope.map, $scope.marker);
              $scope.infoWindows.push($scope.infoWindow);
              $scope.markers.push($scope.marker);

            };
          }
        }
        setTimeout(function () {
          $scope.markerSet();
        }, 100);
      };
      $scope.hide = function () {
        console.log($scope.markers.length);
        for (var i = 0; i < $scope.markers.length; i++) {
          $scope.markers[i].setMap(null);
          $scope.infoWindows[i].close();
          
        };
        $scope.markers.length = 0;
        $scope.infoWindows.length = 0;
      };
    }
    google.maps.event.addDomListener(window, 'load', initialize);

  }();

  $scope.setUser = function (user) {
    $scope.results = [];
    if (user === 'Luke') {
      $scope.user = lukeContacts.set();
    }
    if (user === 'Linda') {
      $scope.user = lindaContacts.set();
    }
    $scope.size = _.size($scope.user);

    for (var i = 0; i < $scope.size; i++) {
      coordinateSearch.search($scope.user[i].location).then(passCoordinates);

      function passCoordinates(data) {
        $scope.results.push(data);
        return $scope.results;
      }
    }
    setTimeout(function () {
      $scope.resultsClick();
    }, 100);
    return $scope.results;
  }
  $scope.resultsClick = function () {
    $scope.contact = [];
    for (var i = 0; i < $scope.size; i++) {

      $scope.contact.push({
        "lat": $scope.results[i].results[0].geometry.location.lat
      });
      $scope.contact.push({
        "lng": $scope.results[i].results[0].geometry.location.lng
      });
    };
    $scope.show();
    return $scope.contact;
  }

      }]);