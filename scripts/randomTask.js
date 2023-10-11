const pickTodoRandomly = () => {
  const randomIndex = Math.floor(Math.random() * tasks.length);

  const taskDivs = document.querySelectorAll(".taskDiv");
  taskDivs.forEach((taskDiv) => {
    taskDiv.classList.remove("active");
  });

  taskDivs[randomIndex].classList.add("active");
};

document.getElementById("pickTodoButton").addEventListener("click", pickTodoRandomly);
