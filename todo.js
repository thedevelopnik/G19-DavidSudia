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

});
//remove a todo
$(document).on('click', 'li', function() {
  $(this).remove();
  strTodo = ($(this).text().replace(''));
  //remember to remove from localStorage
})

// ** helper functions ** //

function seedDataToLocalStorage(todo) {
  if (todo) {
    var currentdata = getDataFromLocalStorage();
    currentdata.push(todo);
    localStorage.setItem('todos', JSON.stringify(currentdata));
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

function removeTodoFromLocalStorage (todo) {
  var current = getDataFromLocalStorage();
  current.filter(function() {
    return str.indexOf(todo) !== -1;
  })
  }
}