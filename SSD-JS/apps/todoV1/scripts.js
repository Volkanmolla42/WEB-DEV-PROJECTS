const addBtn = document.querySelector(".addBtn");
const todoList = JSON.parse(localStorage.getItem("Todos")) || [];
const input = document.querySelector(".input");
const dateInput = document.querySelector(".dateInput");
dateInput.value = new Date().toISOString().split("T")[0];
displayTodos();

addBtn.addEventListener("click", () => {
  if (input.value === "") return;
  else {
    let todo = {
      name: input.value,
      date: dateInput.value,
    };
    todoList.push(todo);
    input.value = "";
    displayTodos();
  }
});

function displayTodos() {
  const todoListContainer = document.querySelector(".todoList");

  let todosHTML = "";
  todoList.forEach((todo, index) => {
    const { name, date } = todo;
    todosHTML += `
            <div class="row">
              <div class="col1">
                ${name}
              </div>
              <div class="col2">
                ${date}
              </div>
              <div class="col3">
                <button class="deleteBtn" onClick='deleteTodo(${index})'>Delete</button>
              </div>
            </div>
          `;
  });
  todoListContainer.innerHTML = todosHTML;
  localStorage.setItem("Todos", JSON.stringify(todoList));
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  displayTodos();
}
