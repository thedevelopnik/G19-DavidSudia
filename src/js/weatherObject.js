//weatherWidget = new Weather and enter boolean values for each of the parameters according to what you want in your widget. Delete msnry.layout if you are not using Masonry


//make a div where you want your widget with an ID to pass into this function.
function makeWeatherWidget (elementId) {
  var currTempVal = !!$('#currTempCheck').is(':checked');
  var todHighVal = !!$('#todHighCheck').is(':checked');
  var todLowVal = !!$('#todLowCheck').is(':checked');
  var currHumVal = !!$('#currHumCheck').is(':checked');
  var currCondVal = !!$('#currCondCheck').is(':checked');
  var iconVal = !!$('#iconCheck').is(':checked');

  var weatherWidget = new Weather(currTempVal, todHighVal, todLowVal, currHumVal, currCondVal, iconVal);

  weatherWidget.getWeather();

  $(elementId).html = weatherWidget.weatherHTML;
}

var Weather = function (currTemp, todLow, todHigh, currHum, todCond, todIcon) {
  this.currentTemp = currTemp;
  this.todayLow = todLow;
  this.todayHigh = todHigh;
  this.currentHum = currHum;
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
  var self = this;

 this.getWeather = function() {
    $.ajax({
      url: 'http://freegeoip.net/json/',
      method: 'GET',
      success: function(data) {
        console.log(data);
        self.userLocation.push(Math.round(data.latitude));
        self.userLocation.push(Math.round(data.longitude));
        // GET RID OF THIS ONCE I LEARN PROMISES
        $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + self.userLocation[0] + '&lon=' + self.userLocation[1] + '&units=imperial&APPID=9f5029722e8e1dc6107a41111a2ee906',
          method: 'GET',
          success: function(data) {
            console.log(data);
            self.currentTemperature.push(Math.round(data['main']['temp']));
            self.currentHumid.push(Math.round(data['main']['humidity']));
            self.todayLowTemp.push(Math.round(data['main']['temp_min']));
            self.todayHighTemp.push(Math.round(data['main']['temp_max']));
            self.todayConditionText.push(data['weather'][0]['description']);
            self.todayCondIcon.push(data['weather'][0]['icon']);
               // Move this back once I learn promises.

            if (self.currentTemp === true) {
              self.weatherHTML += '<p id="temp">Temp</p>';
              var weatherP1 = $('#temp')
              $(weatherP1).html('The current temperature is ' + self.currentTemp[0] + ' degrees Fahrenheit');
            }

            if (self.todayLow === true) {
              self.weatherHTML += '<p id="low">Low</p>';
              var weatherP2 = $('#low');
              $(weatherP2).html('Today\'s low temperature is ' + self.todayLow[0] + ' degrees Fahrenheit');
            }

            if (self.todayHigh) {
              self.weatherHTML += '<p id="high">High</p>';
              var weatherP3 = $('#high');
              $(weatherP3).html('Today\'s high temperature is ' + self.todayHigh[0] + ' degrees Fahrenheit');
            }

            if (this.currentHum === true) {
              self.weatherHTML += '<p id="humid">Humidity</p>';
              var weatherP4 = $('#humid');
              $(weatherP4).html('The current humidity level is ' + self.todayHigh[0] + '%');
            }

            if (self.todayCondition === true) {
              self.weatherHTML += '<p id="condition">Condition</p>';
              var weatherP5 = $('#condition');
              $(weatherP5).html('The current weather condition is ' + self.todayCondition[0]);
            }

            if (self.todayIcon === true) {
              self.weatherHTML += '<div id="weather-icon"></div>'
              var weatherIcon = $('#weather-icon');
              $(weatherIcon).html("<img src='http://openweathermap.org/img/w/" + self.todayIcon[0] + ".png'>");
            }

            msnry.layout();
          }
        });
      }
    });
  }
}

//HTML for the dropdown menu you will need to make selections

// <div class='dropdown open'>
//   <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="true"><img alt='weather widget button' id='btn-weather' class='icon flex-grow' src='./img/weather-icon.png'><span class="caret"></span></a>

//     <div class='form-group dropdown-menu' role='menu'>
//       <form>
//       <ul class='todos'>
//         <li><label>
//           <input type='checkbox' id='currTempCheck' name='currTempCheck' value=''> Current Temperature?
//         </label></li>
//         <li><label>
//           <input type='checkbox' id='todHighCheck' name='todHighCheck' value=''> Today's High?
//         </label></li>
//         <li><label>
//           <input type='checkbox' id='todLowCheck' name='todLowCheck' value=''> Today's Low?
//         </label></li>
//         <li><label>
//           <input type='checkbox' id='currHumCheck' name='currHumCheck' value=''> Current Humidity?
//         </label></li>
//         <li><label>
//           <input type='checkbox' id='currCondCheck' name='currCondCheck' value=''> Current Condition?
//         </label></li>
//         <li><label>
//           <input type='checkbox' id='iconCheck' name='iconCheck' value=''> Condition Icon?
//         </label></li>
//         <li><input type='submit' id='weatherSubmit' name='weatherSubmit' value='Make My Widget!'></li>
//       </ul>
//       </form>
//     </div>
// </div>
