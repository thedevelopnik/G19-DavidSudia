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
// var currentTemp = [];
// var currentHumid = [];
// var todayLow = [];
// var todayHigh = [];
// var todayCondition = [];
// var todayIcon = [];

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