// Global variables
var body = document.getElementsByTagName('body')[0];
var header = document.getElementsByTagName('header')[0];
var grid = document.getElementById('main-grid');
var newDiv = document.createElement('div')


//Initialize Masonry
var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
  // options
  percentPosition: true,
  columnWidth: '.grid-sizer',
  itemSelector: '.grid-item',
});


// Functions for creating each widget
function createMapWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item width-2 mapBox';
  newDiv.innerHTML = '<h2 class="removeWidget">Traffic</h2><div id="map"></div>';
  grid.appendChild(newDiv);
  createMap(initMap);
  msnry.layout();
}

function createCalendarWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item width-2 calBox';
  newDiv.innerHTML = calHTML;
  grid.appendChild(newDiv);
  msnry.layout();
}

function createWeatherWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item weatherBox';
  newDiv.id = 'weather';
  newDiv.innerHTML = weatherHTML;
  grid.appendChild(newDiv);
  msnry.layout();
}

function createTodoWidget() {
  var newDiv = document.createElement('div');
  newDiv.className = 'grid-item width-3 todoBox';
  newDiv.innerHTML = todoHTML;
  grid.appendChild(newDiv);
  todoListCreation();
  msnry.layout();
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
  $('#btn-todo').on('click', function() {
    console.log('you clicked the todo button!');
    createTodoWidget();
    removeWidget();
  });
});


// Enable widget removal
function removeWidget () {
  $('.removeWidget').on('click', function() {
    var parent = $(this).parent();
    console.log('you clicked the heading!')
    parent.remove();
    msnry.layout();
  });
}

$(document).ready(function () {
  removeWidget();
});

