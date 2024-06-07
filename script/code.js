let tasks = [];

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");
  if (taskInput.value.trim() !== "") {
    let task = {
      id: generateId(),
      name: taskInput.value,
      completed: false
    };
    tasks.push(task);
    renderTasks(); 
    taskInput.value = "";
  } else {
    alert("Please enter a task!");
  }
}

function renderTask(task) {
  let taskList = document.getElementById("taskList");
  let li = document.createElement("li");
  li.textContent = task.name;
  if (task.completed) {
    li.classList.add("completed");
  }

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function() {
    deleteTask(task.id);
    taskList.removeChild(li);
  };

  let doneBtn = document.createElement("button");
  doneBtn.textContent = "✔️";
  doneBtn.className = "done-btn";
  doneBtn.onclick = function() {
    markAsDone(task.id);
    li.classList.add("completed");
  };

  li.appendChild(deleteBtn);
  li.appendChild(doneBtn);
  taskList.appendChild(li);
}

function renderTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach(function(task) {
    renderTask(task);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });
  renderTasks(); 
}

function markAsDone(id) {
  let task = tasks.find(function(task) {
    return task.id === id;
  });
  if (task) {
    task.completed = true;
  }
  renderTasks(); 
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function sort() {
  tasks.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
  renderTasks(); 
}

document.getElementById("sort").addEventListener("click", sort);