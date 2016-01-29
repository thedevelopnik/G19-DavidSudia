// Global variables

var body = document.getElementsByTagName('body')[0];

var header = document.getElementsByTagName('header')[0];

var halfBox = '<div class="col-md-1"></div><section class="col-md-4 half-section"></section><div class="col-md-1"></div>';

var fullBox = '<div class="col-md-1"></div><section class="col-md-10 full-section"></section><div class="col-md-1"></div>';

var createRow = '<div class="container-fluid"><div class="row"></div></div>';

var row = document.getElementsByClassName('row');

var halfSections = document.getElementsbyClassName('half-section');

var fullSections = document.getElementsbyClassName('full-section');

// Functions for inserting and removing a half-screen widget

function insertHalfWidget() {
  if (halfSections[0] === undefined) {
    createHalfWidgetSpace();
    searchForEmptyHalfSection();
  } else if ('there are some but none are empty') {

  } else {
    searchForEmptyHalfSection();
  }
}

function searchForEmptyHalfSection(createWidget) {
  for (var i = 0; i < halfSections.length; i++) {
    if (halfSections[i].innerHTML === '') {
      halfSections[i].innerHTML(createWidget());
    }
  }
}

function createHalfWidgetSpace() {
  newRow = body.appendChild(createRow);
  newRow.appendChild(halfBox);
  newRow.appendChild(halfBox);
}

function removeHalfWidget() {

}

// Functions for creating and removing a full screen widget

function insertFullWidget() {
  createFullWidgetSpace();
}

function createFullWidgetSpace() {
  newRow = body.appendChild(createRow);
  newRow.appendChild(fullBox);
}



function removeFullWidget() {

}

// Functions for creating each widget

function createMapWidget() {

}

function createTodoWidget() {

}

function createWeatherWidget() {

}

function createCalendarWidget() {

}
