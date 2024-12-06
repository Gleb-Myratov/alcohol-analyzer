const tabel = document.querySelector(".tabel__content");

const removeRowButtons = document.querySelectorAll(".tabel__remove-button"); // корзина
const mainAddButton = document.getElementById("main-add-button");
const createRowButton = document.getElementById("create-row-button");

const modal = document.getElementById("modal");
const rowInpiuts = document.getElementById("row-inputs");
const tabelInputs = document.querySelectorAll(".tabel__cell--input");

const tabelTemplate = document.querySelector(".tabel__template"); // шаблон строки

function removeAlert() {
  tabelInputs.forEach((_, i) => {
    tabelInputs[i].parentElement.classList.remove("alert");
    tabelInputs[i].offsetWidth; //  перерисовка
  });
}

removeRowButtons.forEach((el) => {
  el.addEventListener("click", () => {
    el.parentElement.parentElement.remove();
  });
});

// tabelInputs.forEach((el) => {
//   el.value = 111; // временно заполнил инпуты
// });

// модальное окно
mainAddButton.addEventListener("click", () => {
  modal.classList.add("active");
  removeAlert();
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) modal.classList.remove("active");
});

//  добавление заполненной строки в таблицу

createRowButton.addEventListener("click", () => {
  let rnd = Math.random();
  removeAlert();
  let validInput = true; // пустая ячейка
  tabelInputs.forEach((el, i) => {
    if (el.value.length < 1 || el.value < 1 || el.value > 9999999) {
      console.log(el.value);
      tabelInputs[i].parentElement.classList.add("alert");
      validInput = false;
    } // проверка на пустой инпут
  });
  if (validInput) {
    tabel.append(tabelTemplate.content.cloneNode(true)); // клонирование шаблона и добавление в таблу
    let tabRows = tabel.querySelectorAll(".tabel__row");
    let newRow = tabRows[tabRows.length - 1]; // новая строка
    let newRowList = newRow.querySelectorAll(".tabel__cell"); // список новой строки
    let newRowDelBtn = newRow.querySelector(".tabel__remove-button"); // кнопка нов строки
    let newRowLabel = newRow.querySelector(".tabel__checkbox-label"); // лейбл
    let newRowInput = newRow.querySelector(".tabel__checkbox-button"); // чекбокс

    for (let i = 0; i < 5; i++) {
      newRowList[i + 1].textContent = tabelInputs[i].value; // добавление в шаблон из инпутов
    }
    newRowDelBtn.addEventListener("click", () =>
      newRowDelBtn.parentElement.parentElement.remove()
    ); // удаление строки в новой строке

    newRow.setAttribute("data-row", `${rnd}`);
    newRowLabel.setAttribute("for", `${rnd}`); // уникальные индефикаторы
    newRowInput.setAttribute("id", `${rnd}`);

    // tabelInputs.forEach((el) => (el.value = "")); // очистка инпута
    modal.classList.remove("active");
  } else {
    console.log("добавь");
    console.log(validInput);
  }
});

let validInput = true;
tabelInputs.forEach((el, i) => {
  if (el.value.length < 1) {
    tabelInputs[i].parentElement.classList.add("alert");
    validInput = false;
  }
});
