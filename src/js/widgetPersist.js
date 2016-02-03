var seed = ['getStart'];

function userPageCreation() {
// in localstorage there is a key 'widgets' with a value of an array
  seedWidgetToLocalStorage();
  var userWidgets = getWidgetsFromLocalStorage();
  runWidgetFunctions(userWidgets);
}




// if there is nothing in the array assigned to that key, getting started is displayed
// if there is something in that key, then the functions to create the widgets assigned to those values are fired
// which means we iterate over the array looking for specific keywords
// then fire associated createWidget functions
// when a widget is created, its associated key term is added to the array
// when a widget is removed, iterate over the array and remove the key term

// helper functions
function seedWidgetToLocalStorage(widget) {
  if (widget) {
    var currentData = getWidgetsFromLocalStorage();
    currentData.push(widget);
    localStorage.setItem('widgets', JSON.stringify(currentData));
  }
  if(!getWidgetsFromLocalStorage()) {
    localStorage.setItem('widgets', JSON.stringify(seed));
  }
}

function getWidgetsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('widgets'));
}

function runWidgetFunctions(arr) {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 'map') {
      createMapWidget();
    } else if (arr[i] === 'cal') {
      createCalendarWidget();
    } else if (arr[i] === 'weather') {
      createWeatherWidget();
    } else if (arr[i] === 'todoList') {
      createTodoWidget();
    } else {
      createGettingStarted();
    }
  }
}

function removeWidgetFromLocalStorage(widget) {
  var current = getWidgetsFromLocalStorage();
  var startIndex = current.indexOf(widget);
  current.splice(startIndex, 1);
  localStorage.setItem('widgets', JSON.stringify(current));
}
