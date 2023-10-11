const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks).map((taskData) => new TaskPremium(taskData.value, taskData.myDiv, taskData.iconClass));
    updateTasks();
  }
};

const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const clearLocalStorage = () => {
  if (confirm("Are you sure you want to clear all saved tasks?")) {
    localStorage.removeItem("tasks");
    tasks = [];
    updateTasks();
  }
};

document.getElementById("clearStorageButton").addEventListener("click", clearLocalStorage);

loadTasksFromLocalStorage();
