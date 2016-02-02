var Weather = function (currTemp, currHum, todLow, todHigh, todCond, todIcon) {
  this.currentTemp = currTemp;
  this.currentHum = currHum;
  this.todayLow = todLow;
  this.todayHigh = todHigh;
  this.todayCondition = todCond;
  this.todayIcon = todIcon;

  this.weatherHTML = "<h2>Weather</h2><p id='temp'>Temp</p><p id='low'>Low</p><p id='high'>High</p><p id='humid'>Humidity</p><p id='condition'>Condition</p><div id='weather-icon'></div>"

  this.getWeather = () {
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
            $(weatherIcon).html("<img src='http://openweathermap.org/img/w/" + todayIcon[0] + ".png'>");
            msnry.layout();
          }
        });
      }
    });
  }
}

// var weatherWidget = new Weather( ... )
// weatherWidget.attachWidget('#weather');
//
//