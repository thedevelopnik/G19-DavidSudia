// Global variables
var body = document.getElementsByTagName('body')[0];
var header = document.getElementsByTagName('header')[0];
var grid = document.getElementById('main-grid');
var newDiv = document.createElement('div');


//Initialize Masonry
var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 200
});


// Functions for creating each widget
function createMapWidget(newGridItem) {
  newGridItem.id = 'map';
  newGridItem.className = 'grid-item--width-2 widgetBox';
  newGridItem.innerHTML = '<h2>Traffic</h2>';
  grid.appendChild(newGridItem);
  createMap(initMap);
  msnry.layout();
}

function createCalendarWidget(newGridItem) {
  newGridItem.className = 'grid-item--width-2 widgetBox';
  newGridItem.innerHTML = calHTML;
  grid.appendChild(newGridItem);
  msnry.layout();
}

function createWeatherWidget(newGridItem) {
  newGridItem.className = 'grid-item widgetBox';
  newGridItem.id = 'weather';
  newGridItem.innerHTML = weatherHTML;
  grid.appendChild(newGridItem);
  msnry.layout();
}

function createTodoWidget(newGridItem) {
}


// Icon clicks to create widgets
$(document).ready(function () {
  $('#btn-map').on('click', function() {
    console.log('you clicked the map button!');
    createMapWidget(newDiv);
  });
  $('#btn-weather').on('click', createWeatherWidget(newDiv));
  $('#btn-cal').on('click', createCalendarWidget(newDiv));
});


// Enable widget removal
$(document).ready(function () {
  $('.widgetBox').on('click', function() {
    this.remove();
    msnry.layout();
  });
});