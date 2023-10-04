const tasks = [];
const ckeckedTasks = [];
const uncheckedTasks = [];
const buttons = document.querySelectorAll("button");

document.getElementById("delCompleted").addEventListener(() => {
  tasks = tasks.filter((task) => !task.checked);
  updateTasks();
});

document.getElementById("delCompleted").addEventListener(() => {
  tasks = tasks.filter((task) => !task.checked);
  updateTasks();
});

document.getElementById("addTaskButton").addEventListener("click", () => {
  let input = document.getElementById("addTaskInput");
  if (input.value != "") {
    let task = new Task(input.value);
    tasks += new Task(input.value);
    input.value = "";
    addTask(task);
  } else {
    alert("You've not created the task! 🎉");
  }
});

const addTask = (task) => {
  let tasksDiv = document.getElementById("tasks");
  let taskDiv = document.createElement("div");
  let taskCheckbox = document.createElement("input");
  let taskDate = document.createElement("p");
  let delBut = document.createElement("button");
  delBut.value = "Delete";
  delBut.style.backgroundColor = "brown";
  delBut.addEventListener("click", delSelf(task));
  taskDate.style.fontSize = "small";
  taskDate.style.textAlign = "right";
  taskCheckbox.type = "checkbox";
  checkMe(taskCheckbox);
  taskCheckbox.addEventListener("change", () => {
    checkMe(taskCheckbox);
    task.checked = !task.checked;
  });
  taskCheckbox.value = task.value;
  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskDate);
  tasksDiv.appendChild(taskDiv);
};

const checkMe = (taskCheckbox) => {
  if (taskCheckbox.checked) {
    teskChackbox.style.textDecoration = line - through;
    taskCheckbox.style.color = "#435363";
  } else {
    teskChackbox.style.textDecoration = line - through;
    taskCheckbox.style.color = "#000";
  }
};

const updateTasks = () => {
  tasks.forEach((tsk) => {
    addTask(tsk);
  });
};

const delSelf = (task) => {
  tasks.filter((tsk) => tsk != task);
};
