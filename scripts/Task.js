class Task {
  constructor(text = "") {
    this.date = new Date();
    this.value = text;
    this.checked = false;
    this.editing = false;
  }

  markAsDone() {
    this.checked = true;
  }
}

class TaskPremium extends Task {
  constructor(text = "", myDiv = null, iconClass = "fa-ambulance") {
    super(text);
    this.iconClass = iconClass;
    this.myDiv = myDiv;
  }

  setIconClass(iconClass) {
    this.iconClass = iconClass;
  }

  getIconHtml() {
    return `<i class="fas ${this.iconClass}"></i>`;
  }
}
