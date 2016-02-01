// ** globals ** //
var todoHTML = '<h2 class="removeWidget">Get Your Shit Together</h2><hr><br><form><div class="form-group"><input type="text" class="form-control" id="todoInput" placeholder="Enter your task..."><label><input id="big-task" type="radio" name="task-size" value="">Big Task</label><label><input id="med-task" type="radio" name="task-size" value="">Medium Task</label><label><input id="small-task" type="radio" name="task-size" value="">Small Task</label></div><button type="submit" class="btn btn-primary">Submit</button></form><div id="beforeTodos"><h3>Your todos</h3><hr></div><div id="todoSection" class="todoContainer"></div>'

var seed = ['<div class="todos box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;You have no todos!</div>'];


// ** dom manipulation ** //
function todoListCreation () {
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

    bigTodo = '<div class="todos bTodo box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</div>';

    medTodo = '<div class="todos mTodo box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</div>';

    smallTodo = '<div class="todos sTodo box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</div>';

    // add new todo to the dom, seed to local storage, and adjust layout
    if ($("#big-task").is(":checked")) {
      $('#todoSection').append(bigTodo);
      seedDataToLocalStorage(bigTodo);
      msnry.layout();
    } else if ($("#med-task").is(":checked")) {
      $('#todoSection').append(medTodo);
      seedDataToLocalStorage(medTodo);
      msnry.layout();
    } else if ($("#small-task").is(":checked")) {
      $('#todoSection').append(smallTodo);
      seedDataToLocalStorage(smallTodo);
      msnry.layout();
    }
    // clear input
    $('input').val('');
  });

  // remove a todo
  $(document).on('click', '.todos', function(){
    $(this).remove();
    var strTodo = ($(this).text()).replace(/X/g, '').trim();
    // remove todo from localstorage
    removeTodoFromLocalStorage(strTodo);
    msnry.layout();
  });
}


$(document).on('ready', function() {
  todoListCreation();
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
    $('#todoSection').append(todo);
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

