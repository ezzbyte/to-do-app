let todoForm = document.querySelector("form");
let todoInput = document.getElementById("todo-input");
let todoListUL = document.getElementById("todo-list");

let allTodo = [];

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  let todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    allTodo.push(todoText);
    updateTodoList();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodo.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  let todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("Li");
  todoLI.className = "todo";

  todoLI.innerHTML = `
      <input type="checkbox" id="${todoId}" />
          <label for="${todoId}" class="custom-checkbox">
            <span class="material-symbols-outlined"> check </span>
          </label>
          <label for="${todoId}" class="todo-text">
            ${todo}
          </label>
          <button class="delete-button">
            <span class="material-symbols-outlined"> delete_forever </span>
          </button>`;

  return todoLI;
}
