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

const table = document.querySelector(".table__content");
const mainAddButton = document.getElementById("main-add-button");
const createRowButton = document.getElementById("create-row-button");
const modal = document.getElementById("modal");
const rowInpiuts = document.getElementById("row-inputs");
const tableInputs = document.querySelectorAll(".table__cell--input");
const tableTemplate = document.querySelector(".table__template"); // шаблон строки
console.log(table.children[1].children[0].children[0].children[0]);

//fcn

const addAlert = (el) => {
  el.parentElement.classList.add(CLASS_NAMES.ALERT);
  el.offsetWidth;
};

const removeAlert = (el) => {
  el.parentElement.classList.remove(CLASS_NAMES.ALERT);
  el.offsetWidth;
};

const removeAllAlerts = () => tableInputs.forEach(removeAlert);
const removeModal = () => modal.classList.remove(CLASS_NAMES.ACTIVE);
const addModal = () => modal.classList.add(CLASS_NAMES.ACTIVE);

const findCheckBoxes = () => {
  const chekboxes = document.querySelectorAll(".table__checkbox-button");
};

const restrictToNumbers = (event, el) => {
  // для циферной ячейки инпута
  if (event.ctrlKey && comboKeys.includes(event.key.toLowerCase())) return;
  if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  } else {
    removeAlert(el);
  }
};

const isValidWithClass = (listInputs) => {
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
  if (isValidWithClass(tableInputs)) {
    let randomID = Math.random();
    table.append(tableTemplate.content.cloneNode(true)); // клонирование шаблона и добавление в таблу
    const tabRows = table.querySelectorAll(".table__row");
    const newRow = tabRows[tabRows.length - 1]; // новая строка
    const newRowList = newRow.querySelectorAll(".table__cell-text"); // список новой строки
    const newRowDelBtn = newRow.querySelector(".table__remove-button"); // кнопка нов строки
    const newRowLabel = newRow.querySelector(".table__checkbox-label"); // лейбл
    const newRowInput = newRow.querySelector(".table__checkbox-button"); // чекбокс

    newRowList.forEach(
      (newCellText, numValueCell) =>
        (newCellText.textContent = tableInputs[numValueCell].value)
    );
    newRow.setAttribute("data-row", `${randomID}`);
    newRowLabel.setAttribute("for", `${randomID}`); // уникальные индефикаторы
    newRowInput.setAttribute("id", `${randomID}`);
    newRowDelBtn.setAttribute("data-remove", `${randomID}`);
    tableInputs.forEach((el) => (el.value = "")); // очистка инпута
    removeModal();
  } else {
    console.error("добавь");
  }
};

const masterCheckbox = document.getElementById("checkbox-0");

const setChechboxesStatus = (collection, state) => {
  collection.forEach((element) => {
    element.querySelector('input[type="checkbox"]').checked = state;
  });
};

const isAllChecked = (сollection) => {
  return сollection.every(
    (row) => row.querySelector('input[type="checkbox"]').checked
  );
};

table.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const rowCollection = [...table.children].slice(1); //магическое число

  if (clickedElement.hasAttribute("data-remove")) {
    const dataIdAttribute = clickedElement.getAttribute("data-remove");
    document.querySelector(`[data-row="${dataIdAttribute}"]`).remove();
  }
  if (clickedElement === masterCheckbox)
    setChechboxesStatus(rowCollection, masterCheckbox.checked);

  if (clickedElement.matches('[checkbox-role="child"]')) {
    masterCheckbox.checked = isAllChecked(rowCollection);
  }
});

mainAddButton.addEventListener("click", () => {
  // модальное окно
  addModal();
  removeAllAlerts();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) removeModal();
});

tableInputs.forEach((el, i) => {
  if (i > 0)
    el.addEventListener("keydown", (event) => restrictToNumbers(event, el));
  if (i === 0) el.addEventListener("keydown", () => removeAlert(el));
});

createRowButton.addEventListener("click", () => {
  removeAllAlerts();
  addNewRow();
});
