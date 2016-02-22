// Global variables
var body = document.getElementsByTagName('body')[0];
var header = document.getElementsByTagName('header')[0];
var grid = document.getElementById('main-grid');
var newDiv = document.createElement('div');


//Initialize Masonry
var msnry = new Masonry('.grid', {
  // options
  percentPosition: true,
  columnWidth: '.grid-sizer',
  itemSelector: '.grid-item',
  transitionDuration: '0.4s'
});


// DOM manipulation
$(document).ready(function () {
  console.log('sanity check');
  // retrieve user's previous widgets from memory
  userPageCreation();
  // enable widget removal on page
  removeWidget();

  // set listeners for clicks on each widget button
  $('#btn-map').on('click', function() {
    event.stopPropagation();
    createMapWidget();
    removeWidget();
  });
  $('#btn-weather').on('click', function() {
    event.stopPropagation();
    createWeatherWidget();
    getWeather();
    removeWidget();
  });
  $('#btn-cal').on('click', function() {
    event.stopPropagation();
    createCalendarWidget();
    removeWidget();
  });
  $('#btn-todo').on('click', function() {
    event.stopPropagation();
    createTodoWidget();
    removeWidget();
  });
});

// Functions for creating each widget
function createMapWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item width-2 mapBox animated zoomIn';
  newDiv.innerHTML = '<h2 class="removeWidget">Traffic</h2><div id="map"></div>';
  grid.appendChild(newDiv);
  createMap(initMap);
  seedWidgetToLocalStorage('map');
  msnry.layout();
}

function createCalendarWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item width-2 calBox animated zoomIn';
  newDiv.innerHTML = calHTML;
  grid.appendChild(newDiv);
  seedWidgetToLocalStorage('cal');
  msnry.layout();
}

function createWeatherWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item weatherBox animated zoomIn';
  newDiv.id = 'weather';
  newDiv.innerHTML = weatherHTML;
  grid.appendChild(newDiv);
  seedWidgetToLocalStorage('weather');
  msnry.layout();
}

function createTodoWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item width-3 todoBox animated zoomIn';
  newDiv.innerHTML = todoHTML;
  grid.appendChild(newDiv);
  todoListCreation();
  seedWidgetToLocalStorage('todoList');
  msnry.layout();
}

function createGettingStarted() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item width-2 getStart animated zoomIn';
  newDiv.id = 'welcome';
  newDiv.innerHTML = getStartHTML;
  grid.appendChild(newDiv);
  msnry.layout();
}

// Enable widget removal
function removeWidget () {
  $('.removeWidget').on('click', function() {
    event.stopPropagation();
    var parent = $(this).parent();
    if ($(parent).hasClass('mapBox')) {
      removeWidgetFromLocalStorage('map');
    } else if ($(parent).hasClass('calBox')) {
      removeWidgetFromLocalStorage('cal');
    } else if ($(parent).hasClass('weatherBox')) {
      removeWidgetFromLocalStorage('weather');
    } else if ($(parent).hasClass('todoBox')) {
      removeWidgetFromLocalStorage('todoList');
    } else if ($(parent).hasClass('getStart')) {
      removeWidgetFromLocalStorage('getStart');
    }
    parent.removeClass('zoomIn');
    parent.addClass('zoomOut');
    setTimeout(function () {
      parent.remove();
    }, 400);
    msnry.layout();
  });
}
