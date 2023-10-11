const iconSelector = document.getElementById("iconSelector");
const iconPopup = document.getElementById("iconPopup");
let selectedIcon = null;

function displayIcons() {
  iconPopup.innerHTML = allIcons.map((iconClass) => `<i class="icon fas ${iconClass}"></i>`).join("");
}

iconPopup.addEventListener("click", (event) => {
  const clickedIcon = event.target;
  if (clickedIcon.classList.contains("icon")) {
    selectedIcon = clickedIcon.classList[2];
    oldIcon = document.querySelector(".choosing");
    iconPopup.style.display = "none";
    tasks.forEach((task) => {
      if (task.myDiv.querySelector(".choosing")) {
        task.iconClass = selectedIcon;
      }
    });
    updateTasks();
  }
});

window.addEventListener("click", (event) => {
  if (event.target === iconPopup) {
    iconPopup.style.display = "none";
    document.querySelector(".choosing").classList.remove(`choosing`);
  }
});
