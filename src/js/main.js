/* -----------------------------------------------
Table of Contents

1. Google Map
  - geolocation
  - traffic layer
2. Location by IP
3. Open Weather/Weather Section
4. Google Calendar
5. Todo List
------------------------------------------------- */

// ** Begin Google Map ** //
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.739, lng: -104.990},
    zoom: 12
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

// ** End Google Map ** //


// ** Begin Location by IP ** //
// Establish variable to hold latitude and longitude for use in Open Weather
var userLocation = []

// Make ajax request to get latitude and longitude
jQuery(document).ready(function () {
  $.ajax({
    url: 'http://freegeoip.net/json/',
    method: 'GET',
    success: function(data) {
      console.log(data);
      userLocation.push(Math.round(data.latitude));
      userLocation.push(Math.round(data.longitude));
      // GET RID OF THIS ONCE I LEARN PROMISES
      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + userLocation[0] + '&lon=' + userLocation[1] + '&units=imperial&APPID=9f5029722e8e1dc6107a41111a2ee906',
        method: 'GET',
        success: function(data) {
          console.log(data);
          currentTemp.push(Math.round(data['main']['temp']));
          currentHumid.push(Math.round(data['main']['humidity']));
          todayLow.push(Math.round(data['main']['temp_min']));
          todayHigh.push(Math.round(data['main']['temp_max']));
          todayCondition.push(Math.round(data['weather']['description']));
          todayIcon.push(Math.round(data['weather']['icon']));
        }
      });
    }
  });
});
// ** End Location by IP ** //


// ** Begin Open Weather ** //
// Establish variables to retrieve from AJAX call
var currentTemp = [];
var currentHumid = [];
var todayLow = [];
var todayHigh = [];
var todayCondition = [];
var todayIcon = [];

//AJAX call for today's weather conditions
//  FIX THIS ONCE I LEARN PROMISES
//  function openWeather () {
//   $.ajax({
//     url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + userLocation[0] + '&lon=' + userLocation[1] + '&units=imperial&APPID=9f5029722e8e1dc6107a41111a2ee906',
//     method: 'GET',
//     success: function(data) {
//       console.log(data);
//       currentTemp.push(Math.round(data['main']['temp']));
//       currentHumid.push(Math.round(data['main']['humidity']));
//       todayLow.push(Math.round(data['main']['temp_min']));
//       todayHigh.push(Math.round(data['main']['temp_max']));
//       todayCondition.push(Math.round(data['weather']['description']));
//       todayIcon.push(Math.round(data['weather']['icon']));
//     }
//   });
// }
// ** End Open Weather ** //


// ** Begin Google Calendar ** //

// ** End Google Calendar ** //


// ** Begin Todo List ** //

// ** End Todo List ** //
