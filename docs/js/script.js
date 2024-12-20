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
const ESCAPE_KEY = "Escape";
//dom

const table = document.querySelector(".table__content");
const mainAddButton = document.getElementById("main-add-button");
const createRowButton = document.getElementById("create-row-button");
const modal = document.getElementById("modal");
const rowInpiuts = document.getElementById("row-inputs");
const tableInputs = document.querySelectorAll(".table__cell--input");
const tableTemplate = document.querySelector(".table__template"); // шаблон строки
const modalInputs = document.getElementById("row-inputs");
const masterCheckbox = document.querySelector(".table__checkbox-master");
const modalValidError = document.querySelector(".modal__validation-error");

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
// const toggleModal = () => modal.classList.toggle(CLASS_NAMES.ACTIVE);
const active = (element) => element.classList.add(CLASS_NAMES.ACTIVE);
const closeElement = (element) => element.classList.remove(CLASS_NAMES.ACTIVE);

const restrictToNumbers = (event, el) => {
  // для циферной ячейки инпута
  if (event.ctrlKey && comboKeys.includes(event.key.toLowerCase())) return;
  if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  } else {
    removeAlert(el);
  }
};

const isValidWithClass = (listInputs, Alert) => {
  // проверка импута валидность, но первая строка не число
  let isInvalid = false;
  Array.from(listInputs).forEach((isValidElement) => {
    //переделать
    if (
      isValidElement.value.length < 1 ||
      (isValidElement.value < LIMITS.MIN_VALUE &&
        isValidElement.value > LIMITS.MAX_VALUE)
    ) {
      isInvalid = true;
      if (Alert) {
        addAlert(isValidElement);
      }
    }
  });
  return !isInvalid;
};

const addNewRow = () => {
  if (isValidWithClass(tableInputs, true)) {
    //так делать нельзя)
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
    closeElement(modal);
    closeElement(modalValidError);
  } else {
    active(modalValidError);
    console.error("добавь");
  }
};

const setChechboxesStatus = (collection, state) => {
  collection.forEach((element) => {
    element.querySelector('input[type="checkbox"]').checked = state;
  });
};

const isAllChecked = (collection) => {
  return collection.every((row) => {
    return row.querySelector('input[type="checkbox"]').checked;
  });
};

//инициализация

table.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const rowCollection = [...table.children].slice(1); //магическое число надо что-то думать

  if (clickedElement.hasAttribute("data-remove")) {
    const dataIdAttribute = clickedElement.getAttribute("data-remove");
    document.querySelector(`[data-row="${dataIdAttribute}"]`).remove();
  } else if (clickedElement.dataset.checkboxRole === "master") {
    setChechboxesStatus(rowCollection, masterCheckbox.checked);
  } else if (clickedElement.dataset.checkboxRole === "child") {
    masterCheckbox.checked = isAllChecked(rowCollection); //=====
  }
});

mainAddButton.addEventListener("click", () => {
  // модальное окно
  active(modal);
  removeAllAlerts();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeElement(modal);
    closeElement(modalValidError);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === ESCAPE_KEY) {
    closeElement(modal);
  }
});

modalInputs.addEventListener("keydown", (event) => {
  const tartget = event.target;

  if (tartget.dataset.type === "number") {
    restrictToNumbers(event, tartget);
  } else if (tartget.dataset.type === "text") {
    removeAlert(tartget); // тут ещё что то должно быть
  }
});

createRowButton.addEventListener("click", () => {
  removeAllAlerts();
  addNewRow();
});
