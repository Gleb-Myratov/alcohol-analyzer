//consts

const LIMITS = {
  MIN_VALUE: 1,
  MAX_VALUE: 9999999,
};

const CLASS_NAMES = {
  ALERT: "alert",
  ACTIVE: "active",
};

const allowedKeys = [
  "Backspace",
  "ArrowLeft",
  "ArrowRight",
  "Delete",
  "Tab",
  "Control",
];
const comboKeys = ["z", "x", "c", "v", "a", "я", "ч", "с", "м", "ф"];

//dom

const tabel = document.querySelector(".tabel__content");
const mainAddButton = document.getElementById("main-add-button");
const createRowButton = document.getElementById("create-row-button");
const modal = document.getElementById("modal");
const rowInpiuts = document.getElementById("row-inputs");
const tabelInputs = document.querySelectorAll(".tabel__cell--input");
const tabelTemplate = document.querySelector(".tabel__template"); // шаблон строки
const chekboxes = document.querySelectorAll(".tabel__checkbox-button");

//fcn

const addAlert = (el) => {
  el.parentElement.classList.add(CLASS_NAMES.ALERT);
  el.offsetWidth;
};

const removeAlert = (el) => {
  el.parentElement.classList.remove(CLASS_NAMES.ALERT);
  el.offsetWidth;
};

const removeAllAlerts = () => tabelInputs.forEach(removeAlert);
const removeModal = () => modal.classList.remove(CLASS_NAMES.ACTIVE);
const addModal = () => modal.classList.add(CLASS_NAMES.ACTIVE);

const restrictToNumbers = (event, el) => {
  // для циферной ячейки инпута
  if (event.ctrlKey && comboKeys.includes(event.key.toLowerCase())) return;
  if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  } else {
    removeAlert(el);
  }
};

const isValidWhithClass = (listInputs) => {
  // проверка импута валидность, но первая строка не число
  let isInvalid = false;
  Array.from(listInputs).forEach((isValidElement) => {
    if (
      isValidElement.value.length < 1 ||
      (isValidElement.value < LIMITS.MIN_VALUE &&
        isValidElement.value > LIMITS.MAX_VALUE)
    ) {
      isInvalid = true;
      addAlert(isValidElement);
    }
  });
  return !isInvalid;
};

let addNewRow = () => {
  if (isValidWhithClass(tabelInputs)) {
    let randomID = Math.random();
    tabel.append(tabelTemplate.content.cloneNode(true)); // клонирование шаблона и добавление в таблу
    const tabRows = tabel.querySelectorAll(".tabel__row");
    const newRow = tabRows[tabRows.length - 1]; // новая строка
    const newRowList = newRow.querySelectorAll(".tabel__cell-text"); // список новой строки
    const newRowDelBtn = newRow.querySelector(".tabel__remove-button"); // кнопка нов строки
    const newRowLabel = newRow.querySelector(".tabel__checkbox-label"); // лейбл
    const newRowInput = newRow.querySelector(".tabel__checkbox-button"); // чекбокс

    newRowList.forEach(
      (newCellText, numValueCell) =>
        (newCellText.textContent = tabelInputs[numValueCell].value)
    );
    newRow.setAttribute("data-row", `${randomID}`);
    newRowLabel.setAttribute("for", `${randomID}`); // уникальные индефикаторы
    newRowInput.setAttribute("id", `${randomID}`);
    newRowDelBtn.setAttribute("data-remove", `${randomID}`);
    tabelInputs.forEach((el) => (el.value = "")); // очистка инпута
    removeModal();
  } else {
    console.error("добавь");
  }
};

// инициализация

chekboxes.forEach((a) => {
  a.checked = true;
});

tabel.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const parent = clickedElement.parentElement;

  if (parent && parent.hasAttribute("data-remove")) {
    const dataIdAttribute = parent.getAttribute("data-remove");
    if (parent.hasAttribute("data-remove")) {
      document.querySelector(`[data-row="${dataIdAttribute}"]`).remove();
    }
  }
});

mainAddButton.addEventListener("click", () => {
  // модальное окно
  addModal();
  removeAllAlerts();
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) removeModal();
});

tabelInputs.forEach((el, i) => {
  if (i > 0)
    el.addEventListener("keydown", (event) => restrictToNumbers(event, el));
  if (i === 0) el.addEventListener("keydown", () => removeAlert(el));
});

createRowButton.addEventListener("click", () => {
  removeAllAlerts();
  addNewRow();
});
