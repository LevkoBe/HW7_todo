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
