//consts

const LIMITS = {
  MIN_VALUE: 1,
  MAX_VALUE: 9999999,
};

const CLASS_NAMES = {
  ALERT: "alert",
  ACTIVE: "active",
};

const appData = {
  editedRow: null,
};

const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab", "Control"];
const comboKeys = ["z", "x", "c", "v", "a", "я", "ч", "с", "м", "ф"];
const ESCAPE_KEY = "Escape";
//dom

const table = document.querySelector(".table__content");
const modalOpenAddButton = document.getElementById("modal-add-button");
const createRowButton = document.getElementById("create-row-button");
const modalAddRow = document.querySelector(".modal__add-row");
// const rowInputs = document.getElementById("row-inputs");
const tableAddInputs = document.querySelectorAll(".table__cell--add-input");
const tableTemplate = document.querySelector(".table__template"); // шаблон строки
const modalRowWithInputs = document.getElementById("row-inputs");
const modalInputs = document.querySelectorAll(".table__cell-input");
const masterCheckbox = document.querySelector(".table__checkbox-master");
const modalValidError = document.querySelector(".modal__validation-error");
const addButtonModal = document.querySelector(".add-button--modal");
const editButtonModal = document.querySelector(".edit-button--modal");

//fcn

const addAlert = (el) => {
  el.parentElement.classList.add(CLASS_NAMES.ALERT);
  el.offsetWidth;
};

const removeAlert = (el) => {
  el.parentElement.classList.remove(CLASS_NAMES.ALERT);
  el.offsetWidth;
};

const removeAllAlerts = () => tableAddInputs.forEach(removeAlert);
const active = (element) => element.classList.add(CLASS_NAMES.ACTIVE);
const deactivate = (element) => element.classList.remove(CLASS_NAMES.ACTIVE);
const clearInputs = (inputs) => inputs.forEach((input) => (input.value = ""));

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
    if (isValidElement.value.length < 1 || (isValidElement.value < LIMITS.MIN_VALUE && isValidElement.value > LIMITS.MAX_VALUE)) {
      isInvalid = true;
      if (Alert) {
        addAlert(isValidElement);
      }
    }
  });
  return !isInvalid;
};

const addNewRow = () => {
  if (isValidWithClass(tableAddInputs, true)) {
    let randomID = Math.random();
    table.append(tableTemplate.content.cloneNode(true)); // клонирование шаблона и добавление в таблу
    const tableRows = table.querySelectorAll(".table__row");
    const newRow = tableRows[tableRows.length - 1]; // новая строка
    const newRowList = newRow.querySelectorAll(".table__cell-text"); // список новой строки
    const newRowDelBtn = newRow.querySelector(".table__remove-button"); // кнопка нов строки
    const newRowLabel = newRow.querySelector(".table__checkbox-label"); // лейбл
    const newRowInput = newRow.querySelector(".table__checkbox-button"); // чекбокс

    newRowList.forEach((newCellText, numValueCell) => (newCellText.textContent = tableAddInputs[numValueCell].value));
    newRow.setAttribute("data-row", `${randomID}`);
    newRowLabel.setAttribute("for", `${randomID}`); // уникальные индефикаторы
    newRowInput.setAttribute("id", `${randomID}`);
    newRowDelBtn.setAttribute("data-remove", `${randomID}`);
    deactivate(modalAddRow);
    deactivate(modalValidError);
    clearInputs(tableAddInputs);
  } else {
    active(modalValidError);
    console.error("добавь");
  }
};

const editRow = (editedRow) => {
  if (isValidWithClass(tableAddInputs, true)) {
    editedRow.forEach((newCellText, numValueCell) => {
      newCellText.textContent = tableAddInputs[numValueCell].value;
    });
    deactivate(modalAddRow);
    deactivate(editButtonModal);
    clearInputs(tableAddInputs);
    active(addButtonModal);
  } else {
    active(modalValidError);
    console.error("добавь");
  }
};

const containValues = (inputsColection, valuesColection) => {
  inputsColection.forEach((input, index) => {
    input.value = valuesColection[index].textContent;
  });
};

const setCheckboxesStatus = (collection, state) => {
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
  const clickedRow = clickedElement.closest("[data-row]");
  if (clickedElement.hasAttribute("data-remove")) {
    const dataIdAttribute = clickedElement.getAttribute("data-remove");
    document.querySelector(`[data-row="${dataIdAttribute}"]`).remove();
  } else if (clickedElement.dataset.checkboxRole === "master") {
    setCheckboxesStatus(rowCollection, masterCheckbox.checked);
  } else if (clickedElement.dataset.checkboxRole === "child") {
    masterCheckbox.checked = isAllChecked(rowCollection);
  } else if (clickedRow && clickedElement.classList.contains("table__cell-text")) {
    appData.editedRow = clickedRow.dataset.row;
    removeAllAlerts();
    deactivate(addButtonModal);
    active(editButtonModal);
    active(modalAddRow);
    const rowTextValues = clickedRow.querySelectorAll(".table__cell-text");
    appData.editedRow = rowTextValues;
    containValues(modalInputs, rowTextValues);
  }
});

modalOpenAddButton.addEventListener("click", () => {
  // модальное окно
  active(modalAddRow);
  removeAllAlerts();
  // clearInputs(modalInputs);
});

modalAddRow.addEventListener("click", (event) => {
  if (event.target === modalAddRow) {
    deactivate(editButtonModal);
    active(addButtonModal);
    deactivate(modalAddRow);
    deactivate(modalValidError);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === ESCAPE_KEY) {
    deactivate(modalAddRow);
    // deactivate(modalEditRow);
  }
});

modalRowWithInputs.addEventListener("keydown", (event) => {
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

editButtonModal.addEventListener("click", () => {
  editRow(appData.editedRow);
});
