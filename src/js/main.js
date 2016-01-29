// Global variables

var body = document.getElementsByTagName('body')[0];

var header = document.getElementsByTagName('header')[0];

var grid = document.getElementById('main-grid');

var gridItemSml = '<div class="grid-item"></div>';

var gridItemMed = '<div class="grid-item--width-2"></div>';

var gridItemLg = '<div class="grid-item--widht-3"></div>';

function removeWidget() {

}

// Functions for creating each widget

function createMapWidget() {
  grid.appendChild(gridItemMed);

}

function createTodoWidget() {

}

function createWeatherWidget() {

}

function createCalendarWidget() {

}
