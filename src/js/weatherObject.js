var Weather = function (currTemp, currHum, todLow, todHigh, todCond, todIcon) {
  this.currentTemp = currTemp;
  this.currentHum = currHum;
  this.todayLow = todLow;
  this.todayHigh = todHigh;
  this.todayCondition = todCond;
  this.todayIcon = todIcon;

  this.userLocation = [];
  this.currentTemperature = [];
  this.currentHumid = [];
  this.todayLowTemp = [];
  this.todayHighTemp = [];
  this.todayConditionText = [];
  this.todayCondIcon = [];
  this.weatherHTML = '<h2>Weather</h2>'

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
            currentTemperature.push(Math.round(data['main']['temp']));
            currentHumid.push(Math.round(data['main']['humidity']));
            todayLowTemp.push(Math.round(data['main']['temp_min']));
            todayHighTemp.push(Math.round(data['main']['temp_max']));
            todayConditionText.push(data['weather'][0]['description']);
            todayCondIcon.push(data['weather'][0]['icon']);
               // Move this back once I learn promises.

            if (this.currentTemp === true) {
              this.weatherHTML += '<p id="temp">Temp</p>';
              var weatherP1 = $('#temp')
              $(weatherP1).html('The current temperature is ' + currentTemp[0] + ' degrees Fahrenheit');
            }

            if (this.todayLow === true) {
              this.weatherHTML += '<p id="low">Low</p>';
              var var weatherP2 = $('#low');
              $(weatherP2).html('Today\'s low temperature is ' + todayLow[0] + ' degrees Fahrenheit');
            }

            if (this.todayHigh) {
              this.weatherHTML += '<p id="high">High</p>';
              var weatherP3 = $('#high');
              $(weatherP3).html('Today\'s high temperature is ' + todayHigh[0] + ' degrees Fahrenheit');
            }

            if (this.currentHum === true) {
              weatherHTML += '<p id="humid">Humidity</p>';
              var weatherP4 = $('#humid');
              $(weatherP4).html('The current humidity level is ' + todayHigh[0] + '%');
            }

            if (this.todayCondition === true) {
              weatherHTML += '<p id="condition">Condition</p>';
              var weatherP5 = $('#condition');
              $(weatherP5).html('The current weather condition is ' + todayCondition[0]);
            }

            if (this.todayIcon === true) {
              weatherHTML += '<div id="weather-icon"></div>'
              var weatherIcon = $('#weather-icon');
              $(weatherIcon).html("<img src='http://openweathermap.org/img/w/" + todayIcon[0] + ".png'>");
            }

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