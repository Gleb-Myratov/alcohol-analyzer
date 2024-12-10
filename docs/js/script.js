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
const removeRowButtons = document.querySelectorAll(".tabel__remove-button"); // корзина
const mainAddButton = document.getElementById("main-add-button");
const createRowButton = document.getElementById("create-row-button");
const modal = document.getElementById("modal");
const rowInpiuts = document.getElementById("row-inputs");
const tabelInputs = document.querySelectorAll(".tabel__cell--input");
const tabelTemplate = document.querySelector(".tabel__template"); // шаблон строки

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

// внизу должна быть инициализация

removeRowButtons.forEach((el) => {
  el.addEventListener("click", () => {
    el.parentElement.parentElement.remove();
  });
});

mainAddButton.addEventListener("click", () => {
  // модальное окно
  addModal();
  removeAllAlerts();
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) removeModal();
});

//  добавление заполненной строки в таблицу

tabelInputs.forEach((el, i) => {
  if (i > 0)
    el.addEventListener("keydown", (event) => restrictToNumbers(event, el));
  if (i === 0) el.addEventListener("keydown", () => removeAlert(el));
});

createRowButton.addEventListener("click", () => {
  let randomID = Math.random();
  removeAllAlerts();
  let validInput = true; // пустая ячейка
  tabelInputs.forEach((el) => {
    if (
      el.value.length < 1 ||
      el.value < LIMITS.MIN_VALUE ||
      el.value > LIMITS.MAX_VALUE
    ) {
      addAlert(el);
      validInput = false;
    } // проверка на пустой инпут
  });

  if (validInput) {
    tabel.append(tabelTemplate.content.cloneNode(true)); // клонирование шаблона и добавление в таблу
    const tabRows = tabel.querySelectorAll(".tabel__row");
    const newRow = tabRows[tabRows.length - 1]; // новая строка
    const newRowList = newRow.querySelectorAll(".tabel__cell"); // список новой строки
    const newRowDelBtn = newRow.querySelector(".tabel__remove-button"); // кнопка нов строки
    const newRowLabel = newRow.querySelector(".tabel__checkbox-label"); // лейбл
    const newRowInput = newRow.querySelector(".tabel__checkbox-button"); // чекбокс

    for (let i = 0; i < 5; i++) {
      newRowList[i + 1].textContent = tabelInputs[i].value; // добавление в шаблон из инпутов
    }
    newRowDelBtn.addEventListener("click", () =>
      newRowDelBtn.parentElement.parentElement.remove()
    ); // удаление строки в новой строке

    newRow.setAttribute("data-row", `${randomID}`);
    newRowLabel.setAttribute("for", `${randomID}`); // уникальные индефикаторы
    newRowInput.setAttribute("id", `${randomID}`);

    tabelInputs.forEach((el) => (el.value = "")); // очистка инпута
    removeModal();
  } else {
    console.error("добавь");
  }
});
