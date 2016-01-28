// ** globals ** //
var seed = [
  'Say happy birthday',
  'Wash the car',
  'Watch the Bronocos win',
  'Look at Wes'
];


// ** dom manipulation ** //

$(document).on('ready', function() {

  // seed data to local storage
  seedDataToLocalStorage();

  // grab data from local storage
  var allYourTodos = getDataFromLocalStorage();

  // append data to the dom
  appendToDom(allYourTodos);
  // handle form submission
  $('form').on('submit', function(event) {
    event.preventDefault();
    var todo = $('input').val();
    // add new todo to the dom
    $('#all-todos').append(
      '<li><button class="btn btn-danger btn-sm">X</button>&nbsp;'+todo+'</li>'
    );
    // update localstorage
    seedDataToLocalStorage(todo);
    // clear input
    $('input').val('');
  });

  // remove a todo
  $(document).on('click', 'li', function(){
    $(this).remove();
    var strTodo = ($(this).text()).replace(/X/g, '').trim();
    // remove todo from localstorage
    removeTodoFromLocalStorage(strTodo);
  });

});


// ** helper functions ** //

function seedDataToLocalStorage(todo) {
  if (todo) {
    var currentData = getDataFromLocalStorage();
    currentData.push(todo);
    localStorage.setItem('todos', JSON.stringify(currentData));
  }
  if(!getDataFromLocalStorage()) {
    localStorage.setItem('todos', JSON.stringify(seed));
  }
}

function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem('todos'));
}

function appendToDom(arr) {
  arr.forEach(function(todo){
    $('#all-todos').append(
      '<li><button class="btn btn-danger btn-sm">X</button>&nbsp;'+todo+'</li>'
    );
  });
}

function removeTodoFromLocalStorage(todo) {
  /*
  1. get data from local storage
  2. find item in array and remove
    'one'
    ['one', 'two', 'three']
  3. set data to local storage
  */
  var current = getDataFromLocalStorage();
  var startIndex = current.indexOf(todo);
  current.splice(startIndex, 1);
  localStorage.setItem('todos', JSON.stringify(current));
}
// ** End Todo List ** //
