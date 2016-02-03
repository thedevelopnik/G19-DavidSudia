var seed = ['gettingStarted']

// get items from local storage with key 'widgets'
function getWidgetsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('widgets'));
}
// in localstorage there is a key 'widgets' with a value of an array
// if there is nothing in the array assigned to that key, getting started is displayed
function seedTodosToLocalStorage(widget) {
  if (widget) {
    var currentData = getWidgetsFromLocalStorage();
    currentData.push(widget);
    localStorage.setItem('widgets', JSON.stringify(currentData));
  }
  if(!getWidgetsFromLocalStorage()) {
    localStorage.setItem('widgets', JSON.stringify(seed));
  }
}
// if there is something in that key, then the functions to create the widgets assigned to those values are fired
function appendToDom(arr) {
  arr.forEach(function(widget){
    $('#todoSection').append(widget);
  });
}
// which means we iterate over the array looking for specific keywords
// then fire associated createWidget functions
// when a widget is created, its associated key term is added to the array
// when a widget is removed, iterate over the array and remove the key term
function removeTodoFromLocalStorage(todo) {
  var current = getTodosFromLocalStorage();
  var startIndex = current.indexOf(todo);
  current.splice(startIndex, 1);
  localStorage.setItem('widgets', JSON.stringify(current));
}
