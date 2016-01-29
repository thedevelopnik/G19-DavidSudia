// Global variables

var body = document.getElementsByTagName('body')[0];

var header = document.getElementsByTagName('header')[0];

var grid = document.getElementById('main-grid');

var newDiv = document.createElement('div');

function removeWidget() {

}

// Functions for creating each widget

function createMapWidget(newGridItem) {
  newGridItem.id = 'map';
  newGridItem.className = 'grid-item--width-2';
  newGridItem.innerHTML = '<h2>Traffic</h2>';
  grid.appendChild(newGridItem);
}

function createCalendarWidget(newGridItem) {
  newGridItem.className = 'grid-item--width-2';
  newGridItem.innerHTML = calHTML;
}

function createWeatherWidget() {

}

function createTodoWidget(newGridItem) {
}



