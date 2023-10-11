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
let function1 = (a, b) => {
  let firstTime = new Date(a.date);
  let secondTime = new Date(b.date);
  return secondTime - firstTime;
};
let function2 = (a, b) => {
  let firstTime = new Date(a.date);
  let secondTime = new Date(b.date);
  return firstTime - secondTime;
};
let sortFunction = function1;
document.getElementById("sortButton").addEventListener("click", () => {
  if (sortFunction === function1) {
    sortFunction = function2;
  } else sortFunction = function1;
  updateTasks();
});

const getAndAddTask = () => {
  let input = document.getElementById("addTaskInput");
  if (input.value != "") {
    let task = new TaskPremium(input.value);
    tasks.push(task);
    input.value = "";
    addTask(task);
    updateTasks();
  } else {
    alert("You've not created the task! 🎉");
  }
}

document.getElementById("addTaskButton").addEventListener("click", getAndAddTask);

const editTask = (taskDiv, task) => {
  task.editing = true;
  let inputField = taskDiv.querySelectorAll("input")[1];
  let spanText = taskDiv.querySelector("span");

  inputField.style.display = "block";
  spanText.style.display = "none";

  let buttons = taskDiv.querySelectorAll("button");
  let delButton = buttons[0];
  let saveButton = buttons[1];

  delButton.style.display = "none";
  saveButton.style.display = "block";

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (inputField.value == "") {
        dontEditTask(taskDiv, task);
      }
      else
      stopEditTask(taskDiv, task);
    } else if (event.key === "Escape") {
      dontEditTask(taskDiv, task);
    }
  });
};

const dontEditTask = (taskDiv, task) => {
  task.editing = false;
  let inputField = taskDiv.querySelectorAll("input")[1];
  let spanText = taskDiv.querySelector("span");

  inputField.value = task.value;

  inputField.style.display = "none";
  spanText.style.display = "block";

  let buttons = taskDiv.querySelectorAll("button");
  let delButton = buttons[0];
  let saveButton = buttons[1];

  delButton.style.display = "block";
  saveButton.style.display = "none";
};

const stopEditTask = (taskDiv, task) => {
  task.editing = false;
  let inputField = taskDiv.querySelectorAll("input")[1];
  let spanText = taskDiv.querySelector("span");

  task.value = inputField.value;
  task.date = new Date();

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

  let iconSpan = document.createElement("span");
  iconSpan.innerHTML = `<i class="fas ${task.iconClass}"></i>`;
  iconSpan.addEventListener("click", () => {
    displayIcons();
    iconSpan.classList.add("choosing");
    iconPopup.style.display = "block";
  });

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
    if (editableDescription.value == "") {
      dontEditTask(taskDiv, task);
    } else {
      stopEditTask(taskDiv, task);
    }
  });
  saveButton.style.display = "none";

  taskDate.classList.toggle("dateOfLastChange");
  taskDate.textContent = task.date.toLocaleTimeString();

  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.checked;
  applyCheckStyle(taskCheckbox);
  taskCheckbox.addEventListener("change", () => {
    task.checked = !task.checked;
    updateTasks();
  });

  let singleClickTimer;
  taskDiv.addEventListener("click", () => {
    if (!task.editing && !document.querySelector(".choosing")) {
      if (!singleClickTimer) {
        singleClickTimer = setTimeout(() => {
          singleClickTimer = null;
          task.checked = !task.checked;
          updateTasks();
        }, 300);
      } else {
        clearTimeout(singleClickTimer);
        singleClickTimer = null;
        editTask(taskDiv, task);
      }
    }
  });

  taskDiv.appendChild(iconSpan);
  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskDescription);
  taskDiv.appendChild(editableDescription);
  taskDiv.appendChild(delButton);
  taskDiv.appendChild(saveButton);
  taskDiv.appendChild(taskDate);

  tasksDiv.appendChild(taskDiv);
  task.myDiv = taskDiv;
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
  tasks.sort(sortFunction).sort((a, b) => 
  {
      if (a.checked && !b.checked) {
        return 1;
      }
      if (!a.checked && b.checked) {
        return -1;
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
