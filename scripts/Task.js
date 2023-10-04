class Task {
  constructor(text = "") {
    let date = new Date().toLocalTimeString();
    let value = text;
    let checked = false;
  }

  markAsDone() {
    this.checked = true;
  }
}
