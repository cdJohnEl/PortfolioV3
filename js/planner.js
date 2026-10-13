// Academic planner: add, complete, delete, filter, persist
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const errorEl = document.getElementById("task-error");
const countEl = document.getElementById("task-count");
const emptyEl = document.getElementById("empty");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let filter = "all";

function save() { localStorage.setItem("tasks", JSON.stringify(tasks)); }

function render() {
  list.innerHTML = "";
  const visible = tasks.filter(t => filter === "all" || (filter === "done" ? t.done : !t.done));
  visible.forEach(t => {
    const li = document.createElement("li");
    li.className = "task" + (t.done ? " done" : "");
    li.dataset.id = t.id;
    const cb = document.createElement("input");
    cb.type = "checkbox"; cb.checked = t.done;
    cb.setAttribute("aria-label", "Mark complete: " + t.text);
    const span = document.createElement("span");
    span.textContent = t.text;
    const del = document.createElement("button");
    del.className = "del"; del.textContent = "Delete";
    del.setAttribute("aria-label", "Delete task: " + t.text);
    li.append(cb, span, del);
    list.appendChild(li);
  });
  const left = tasks.filter(t => !t.done).length;
  countEl.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}, ${left} remaining`;
  emptyEl.hidden = visible.length > 0;
}

function addTask(text) {
  tasks.push({ id: Date.now(), text, done: false });
  save(); render();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) { errorEl.textContent = "Please enter a task."; input.classList.add("invalid"); return; }
  errorEl.textContent = ""; input.classList.remove("invalid");
  addTask(text);
  input.value = ""; input.focus();
});

list.addEventListener("click", e => {
  const id = Number(e.target.closest("li")?.dataset.id);
  if (e.target.matches(".del")) { tasks = tasks.filter(t => t.id !== id); save(); render(); }
});
list.addEventListener("change", e => {
  if (!e.target.matches("input[type=checkbox]")) return;
  const id = Number(e.target.closest("li").dataset.id);
  const t = tasks.find(t => t.id === id);
  t.done = e.target.checked; save(); render();
});

document.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
  chip.classList.add("is-active");
  filter = chip.dataset.filter; render();
}));

render();
