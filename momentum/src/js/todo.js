const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-title");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

if (localStorage.getItem("todoIsActive")) {
  form.classList.add("active");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) todoText = todo.text;
  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.innerText = todoText;

    todoEl.classList.add("todo-item");

    if (todo && todo.completed) todoEl.classList.add("completed");

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todoList.append(todoEl);

    input.value = "";

    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll(".todo-item");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleTodoList() {
  if (form.classList.contains("active")) {
    form.classList.remove("active");
    localStorage.setItem("todoIsActive", "");
  } else {
    form.classList.add("active");
    localStorage.setItem("todoIsActive", "true");
  }
}

todoButton.addEventListener("click", toggleTodoList);
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => (form.style.transition = "all 0.3s"), 100);
});
