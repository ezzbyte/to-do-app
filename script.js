let todoForm = document.querySelector("form");
let todoInput = document.getElementById("todo-input");
let todoListUL = document.getElementById("todo-list");

let allTodo = getTodos();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  let todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    let todoObject = {
      text: todoText,
      completed: false,
    };
    allTodo.push(todoObject);
    saveTodos();
    updateTodoList();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodo.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  let todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  let todoText = todo.text;
  todoLI.className = "todo";

  todoLI.innerHTML = `
      <input type="checkbox" id="${todoId}" />
          <label for="${todoId}" class="custom-checkbox">
            <span class="material-symbols-outlined"> check </span>
          </label>
          <label for="${todoId}" class="todo-text">
            ${todoText}
          </label>
          <button class="delete-button">
            <span class="material-symbols-outlined"> delete_forever </span>
          </button>`;

  let deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  let checkbox = todoLI.querySelector("input");

  checkbox.addEventListener("change", () => {
    allTodo[todoIndex].completed = checkbox.checked;
    todoLI.classList.toggle("completed", todo.completed);
    saveTodos();
  });

  checkbox.checked = todo.completed;

  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodo = allTodo.filter((todo, index) => index !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  let todosJson = JSON.stringify(allTodo);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  let todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
