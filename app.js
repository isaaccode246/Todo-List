
// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.getElementsByClassName('filter-todo')[0];

// Event Listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteChecked);
filterOption.addEventListener("click", filterTodo);

// Function
function addTodo(e) {
// Prevent the webpage from refreshing
    e.preventDefault();
// Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
// Create Li
    const newLi = document.createElement("li");
    newLi.innerText = todoInput.value
    newLi.classList.add("todo-item");
    todoDiv.appendChild(newLi);
// ADD TODO TO LOCAL STORAGE
    saveLocalTodo(todoInput.value);
// Check Mark Button
// Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
// Check Trash Button
// Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
// APPEND TO THE LIST
// APPEND TO THE LIST
    todoList.appendChild(todoDiv);
    // CLEAR TODO INPUT.VALUE
    // CLEAR TODO INPUT.VALUE
    todoInput.value = "";
}


function deleteChecked(e) {
    const item = e.target;
    // DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        // The remove function
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

      // Check Mark
      if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
    let todos = todoList.childNodes;
    todos.forEach(function(todo){
            switch(e.target.value) {
                case "all":
                    todo.style.display = "flex";
                break;
                case "completed":
                    if(todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                break;
                case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            }
    });
}

function saveLocalTodo(todo) {
    // CHECK  ---- DO  HAVE ALREADY HAVE A TODO IN THERE?
    let todos;
    if (localStorage.getItem("todos") === null ) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
      // CHECK  ---- DO  HAVE ALREADY HAVE A TODO IN THERE?
      let todos;
      if (localStorage.getItem("todos") === null ) {
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.forEach(function(todo) {
        // Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
// Create Li
    const newLi = document.createElement("li");
    newLi.innerText = todo
    newLi.classList.add("todo-item");
    todoDiv.appendChild(newLi);
// Check Mark Button
// Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
// Check Trash Button
// Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
// APPEND TO THE LIST
// APPEND TO THE LIST
    todoList.appendChild(todoDiv);
      });
}

// Delete todos from the local storage
// Delete todos from the local storage

function removeLocalTodos(todo) {
     // CHECK  ---- DO  HAVE ALREADY HAVE A TODO IN THERE?
     let todos;
     if (localStorage.getItem("todos") === null ) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem("todos"));
     }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}