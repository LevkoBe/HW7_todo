let tasks = [];
let buttons = document.querySelectorAll("button");

document.getElementById("delCompleted").addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.checked);
  updateTasks();
});

document.getElementById("delAll").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the tasks?")) {
    tasks = [];
    updateTasks();
  }
});

document.getElementById("addTaskButton").addEventListener("click", () => {
  let input = document.getElementById("addTaskInput");
  if (input.value != "") {
    let task = new Task(input.value);
    tasks.push(task);
    input.value = "";
    addTask(task);
  } else {
    alert("You've not created the task! 🎉");
  }
});

const editTask = (taskDiv, task) => {
  let inputField = taskDiv.querySelectorAll("input")[1];
  let spanText = taskDiv.querySelector("span");

  inputField.style.display = "block";
  spanText.style.display = "none";

  let buttons = taskDiv.querySelectorAll("button");
  let delButton = buttons[0];
  let saveButton = buttons[1];

  delButton.style.display = "none";
  saveButton.style.display = "block";
};

const stopEditTask = (taskDiv, task) => {
  let inputField = taskDiv.querySelectorAll("input")[1];
  let spanText = taskDiv.querySelector("span");

  task.value = inputField.value;
  task.date = new Date().toLocaleTimeString();

  inputField.style.display = "none";
  spanText.style.display = "block";

  let buttons = taskDiv.querySelectorAll("button");
  let delButton = buttons[0];
  let saveButton = buttons[1];

  delButton.style.display = "block";
  saveButton.style.display = "none";

  updateTasks();
};

const addTask = (task) => {
  let tasksDiv = document.getElementById("tasks");

  let taskDiv = document.createElement("div");
  taskDiv.classList.toggle("taskDiv");

  let taskCheckbox = document.createElement("input");
  let editableDescription = document.createElement("input");
  let taskDescription = document.createElement("span");
  let taskDate = document.createElement("p");
  let delButton = document.createElement("button");
  let saveButton = document.createElement("button");

  taskDescription.textContent = task.value;
  editableDescription.value = taskDescription.textContent;
  editableDescription.style.display = "none";

  delButton.textContent = "Delete";
  delButton.classList.toggle("deleteButton");
  delButton.addEventListener("click", () => {
    deleteSelf(task);
  });
  saveButton.textContent = "Save";
  saveButton.classList.toggle("saveButton");
  saveButton.addEventListener("click", () => {
    updateTasks();
  });
  saveButton.style.display = "none";

  taskDate.classList.toggle("dateOfLastChange");
  taskDate.textContent = task.date;

  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.checked;
  applyCheckStyle(taskCheckbox);
  taskCheckbox.addEventListener("change", () => {
    applyCheckStyle(taskCheckbox);
    task.checked = !task.checked;
  });

  taskDiv.addEventListener("dblclick", () => {
    editTask(taskDiv, task);
  });

  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskDescription);
  taskDiv.appendChild(editableDescription);
  taskDiv.appendChild(delButton);
  taskDiv.appendChild(saveButton);
  taskDiv.appendChild(taskDate);

  tasksDiv.appendChild(taskDiv);
};

const applyCheckStyle = (taskCheckbox) => {
  if (taskCheckbox.checked) {
    taskCheckbox.style.textDecoration = "line-through";
    taskCheckbox.style.color = "#435363";
  } else {
    taskCheckbox.style.textDecoration = "none";
    taskCheckbox.style.color = "#000";
  }
};

const updateTasks = () => {
  tasks
    .sort((a, b) => {
      let firstTime = new Date(a.date);
      let secondTime = new Date(b.date);
      return firstTime - secondTime;
    })
    .sort((a, b) => {
      if (a.checked && !b.checked) {
        return -1;
      }
      if (!a.checked && b.checked) {
        return 1;
      }
      return 0;
    });
  document.getElementById("tasks").innerHTML = "";
  tasks.forEach((tsk) => {
    addTask(tsk);
  });
};

const deleteSelf = (task) => {
  tasks = tasks.filter((tsk) => tsk !== task);
  updateTasks();
};
