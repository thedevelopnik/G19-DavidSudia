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
var userLocation = [];

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
          todayCondition.push(data['weather'][0]['description']);
          todayIcon.push(data['weather'][0]['icon']);
             // Move this back once I learn promises.
          var weatherP1 = $('#temp');
          var weatherP2 = $('#low');
          var weatherP3 = $('#high');
          var weatherP4 = $('#humid');
          var weatherP5 = $('#condition');
          var weatherIcon = $('#weather-icon');
          $(weatherP1).html('The current temperature is ' + currentTemp[0] + ' degrees Fahrenheit');
          $(weatherP2).html('Today\'s low temperature is ' + todayLow[0] + ' degrees Fahrenheit');
          $(weatherP3).html('Today\'s high temperature is ' + todayHigh[0] + ' degrees Fahrenheit');
          $(weatherP4).html('The current humidity level is ' + todayHigh[0] + '%');
          $(weatherP5).html('The current weather condition is ' + todayCondition[0]);
          $(weatherIcon).html('<img alt = ' + todayCondition[0] + 'src="http://openweathermap.org/img/w/"' + todayIcon[0]);
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

//Put variable values into DOM
// jQuery(document).ready(function () {
//   var weatherP1 = $('#weather p:first-child');
//   var weatherP2 = $(weatherP1).next;
//   var weatherP3 = $(weatherP2).next;
//   var weatherP4 = $(weatherP3).next;
//   var weatherP5 = $(weatherP4).next
//   $(weatherP1).html('The current temperature is ' + currentTemp[0] + 'degrees Fahrenheit');
//   $(weatherP2).html('Today\'s low temperature is ' + todayLow[0] + ' degrees Fahrenheit');
//   $(weatherP3).html('Today\'s high temperature is ' + todayHigh[0] + ' degrees Fahrenheit');
//   $(weatherP4).html('The current humidity level is ' + todayHigh[0] + '%');
//   $(weatherP5).html('The current weather condition is ' + todayCondition[0] + ' ' + <img alt=todayCondition[0] src='http://openweathermap.org/img/w/' + todayIcon[0]);
// });

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
var CLIENT_ID = '723061971439-dv1pbtq741e2dk5n05psbrnufa99p4cj';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    // authorizeDiv.style.display = 'none';
    loadCalendarApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')');
      }
    } else {
      appendPre('No upcoming events found.');
    }

  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
// ** End Google Calendar ** //


// ** Begin Todo List ** //

// ** End Todo List ** //
