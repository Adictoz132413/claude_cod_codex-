"use strict";

(() => {
  const STORAGE_KEY = "lista-de-tareas.v1";

  const form = document.getElementById("new-task-form");
  const input = document.getElementById("new-task-input");
  const list = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");
  const summary = document.getElementById("summary");
  const storageWarning = document.getElementById("storage-warning");

  let tasks = loadTasks();

  function isValidTask(task) {
    return (
      task !== null &&
      typeof task === "object" &&
      typeof task.id === "string" &&
      /^[A-Za-z0-9-]+$/.test(task.id) &&
      typeof task.title === "string" &&
      task.title.trim().length > 0 &&
      task.title.length <= 200 &&
      typeof task.done === "boolean"
    );
  }

  // Lee las tareas guardadas; si no hay datos válidos, empieza con una lista vacía.
  function loadTasks() {
    let raw;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      showStorageWarning();
      return [];
    }
    if (!raw) {
      return [];
    }
    try {
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) {
        return [];
      }
      const ids = new Set();
      return data.filter((task) => {
        if (!isValidTask(task) || ids.has(task.id)) {
          return false;
        }
        ids.add(task.id);
        return true;
      });
    } catch (error) {
      return [];
    }
  }

  function saveTasks() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      showStorageWarning();
    }
  }

  function showStorageWarning() {
    storageWarning.hidden = false;
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function findTask(id) {
    return tasks.find((task) => task.id === id);
  }

  function createTaskElement(task) {
    const item = document.createElement("li");
    item.className = "task";
    item.classList.toggle("task--done", task.done);
    item.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task__toggle";
    checkbox.id = "task-" + task.id;
    checkbox.checked = task.done;

    const label = document.createElement("label");
    label.className = "task__title";
    label.htmlFor = checkbox.id;
    label.textContent = task.title;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "task__delete";
    removeButton.textContent = "Eliminar";
    removeButton.setAttribute("aria-label", "Eliminar «" + task.title + "»");

    item.append(checkbox, label, removeButton);
    return item;
  }

  function updateSummary() {
    const total = tasks.length;
    if (total === 0) {
      summary.textContent = "No hay tareas.";
      return;
    }
    const pending = tasks.filter((task) => !task.done).length;
    summary.textContent =
      pending + (pending === 1 ? " pendiente" : " pendientes") +
      " de " + total + (total === 1 ? " tarea." : " tareas.");
  }

  function render() {
    list.replaceChildren(...tasks.map(createTaskElement));
    emptyState.hidden = tasks.length > 0;
    updateSummary();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = input.value.trim();
    input.value = "";
    input.focus();
    if (!title) {
      return;
    }
    tasks.push({ id: createId(), title, done: false });
    saveTasks();
    render();
  });

  // Marcar o desmarcar no vuelve a dibujar la lista, para no perder el foco del teclado.
  list.addEventListener("change", (event) => {
    const checkbox = event.target.closest(".task__toggle");
    if (!checkbox) {
      return;
    }
    const item = checkbox.closest(".task");
    const task = findTask(item.dataset.id);
    if (!task) {
      return;
    }
    task.done = checkbox.checked;
    item.classList.toggle("task--done", task.done);
    saveTasks();
    updateSummary();
  });

  list.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".task__delete");
    if (!removeButton) {
      return;
    }
    const id = removeButton.closest(".task").dataset.id;
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    render();
    input.focus();
  });

  render();
})();
