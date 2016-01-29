// ** globals ** //
var seed = ['<div class="row"><div class="col-md-1"></div><div class="col-md-10"><article class="todos box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;You have no todos!</article></div><div class="col-md-1"></div></div>'];


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

    bigTodo = '<div class="row"><div class="col-md-1"></div><div class="col-md-10"><article class="todos box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</article></div><div class="col-md-1"></div></div>';

    medTodo = '<div class="row"><div class="col-md-2"></div><div class="col-md-8"><article class="todos box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</article></div><div class="col-md-2"></div></div>';

    smallTodo = '<div class="row"><div class="col-md-3"></div><div class="col-md-6"><article class="todos box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</article></div><div class="col-md-3"></div></div>';

    // add new todo to the dom and seed to local storage
    if ($("#big-task").is(":checked")) {
      $('#beforeTodos').after(bigTodo);
      seedDataToLocalStorage(bigTodo);
    } else if ($("#med-task").is(":checked")) {
      $('#beforeTodos').after(medTodo);
      seedDataToLocalStorage(medTodo);
    } else if ($("#small-task").is(":checked")) {
      $('#beforeTodos').after(smallTodo);
      seedDataToLocalStorage(smallTodo);
    }
    // clear input
    $('input').val('');
  });

  // remove a todo
  $(document).on('click', 'article', function(){
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
    $('#beforeTodos').after(todo);
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

