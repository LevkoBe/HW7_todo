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

const addTask = (task) => {
  let tasksDiv = document.getElementById("tasks");

  let taskDiv = document.createElement("div");
  taskDiv.classList.toggle("taskDiv");

  let taskCheckbox = document.createElement("input");
  let taskDescription = document.createElement("span");
  let taskDate = document.createElement("p");
  let delButton = document.createElement("button");

  taskDescription.textContent = task.value;

  delButton.textContent = "Delete";
  delButton.classList.toggle("deleteButton");
  delButton.addEventListener("click", () => {
    deleteSelf(task);
  });

  taskDate.classList.toggle("dateOfLastChange");
  taskDate.textContent = task.date;

  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = false;
  applyCheckStyle(taskCheckbox);
  taskCheckbox.addEventListener("change", () => {
    applyCheckStyle(taskCheckbox);
    task.checked = !task.checked;
  });

  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskDescription);
  taskDiv.appendChild(delButton);
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
