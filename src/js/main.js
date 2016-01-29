// Global variables

var body = document.getElementsByTagName('body')[0];

var header = document.getElementsByTagName('header')[0];

var grid = document.getElementById('main-grid');

var newDiv = document.createElement('div');

// Enable widget removal
$(document).ready(function () {
  $('.widgetBox').on('click', function() {
    this.remove();
    $grid.masonry();
  });
});

// Functions for creating each widget

function createMapWidget(newGridItem) {
  newGridItem.id = 'map';
  newGridItem.className = 'grid-item--width-2 widgetBox';
  newGridItem.innerHTML = '<h2>Traffic</h2>';
  grid.appendChild(newGridItem);
  msnry.layout();
}

function createCalendarWidget(newGridItem) {
  newGridItem.className = 'grid-item--width-2 widgetBox';
  newGridItem.innerHTML = calHTML;
  msnry.layout();
}

function createWeatherWidget(newGridItem) {
  newGridItem.className = 'grid-item widgetBox';
  newGridItem.id = 'weather';
  newGridItem.innerHTML = weatherHTML;
}

function createTodoWidget(newGridItem) {
}



