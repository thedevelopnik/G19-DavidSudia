// Global variables
var body = document.getElementsByTagName('body')[0];
var header = document.getElementsByTagName('header')[0];
var grid = document.getElementById('main-grid');
var newDiv = document.createElement('div')


//Initialize Masonry
var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 250
});


// Functions for creating each widget
function createMapWidget() {
  var newDiv = document.createElement('div')
  newDiv.className = 'grid-item width-2 widgetBox';
  newDiv.innerHTML = '<h2>Traffic</h2><div id="map"></div>';
  grid.appendChild(newDiv);
  createMap(initMap);
  msnry.layout();
}

function createCalendarWidget() {
  var newDiv = document.createElement('div')
  newDiv.className = 'grid-item width-2 widgetBox';
  newDiv.innerHTML = calHTML;
  grid.appendChild(newDiv);
  msnry.layout();
}

function createWeatherWidget() {
  var newDiv = document.createElement('div')
  newDiv.className = 'grid-item widgetBox';
  newDiv.id = 'weather';
  newDiv.innerHTML = weatherHTML;
  grid.appendChild(newDiv);
  msnry.layout();
}

function createTodoWidget(newGridItem) {
}


// Icon clicks to create widgets
$(document).ready(function () {
  $('#btn-map').on('click', function() {
    console.log('you clicked the map button!');
    createMapWidget();
    removeWidget();
  });
  $('#btn-weather').on('click', function() {
    console.log('you clicked the weather button!');
    createWeatherWidget();
    getWeather();
    removeWidget();
  });
  $('#btn-cal').on('click', function() {
    console.log('you clicked the cal button!');
    createCalendarWidget();
    removeWidget();
  });
});


// Enable widget removal
function removeWidget () {
  $('.widgetBox').on('click', function() {
    this.remove();
    msnry.layout();
  });
}

$(document).ready(function () {
  removeWidget();
});

