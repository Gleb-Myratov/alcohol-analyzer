const tabel = document.querySelector(".tabel__content");

const removeRowButtons = document.querySelectorAll(".tabel__remove-button"); // корзина
const mainAddButton = document.getElementById("main-add-button");
const createRowButton = document.getElementById("create-row-button");

const modal = document.getElementById("modal");
const rowInpiuts = document.getElementById("row-inputs");
const tabelInputs = document.querySelectorAll(".tabel__cell--input");

const tabelTemplate = document.querySelector(".tabel__template"); // шаблон строки

removeRowButtons.forEach((el) => {
  el.addEventListener("click", () => {
    el.parentElement.parentElement.remove();
  });
});

tabelInputs.forEach((el) => {
  el.value = 111; // временно заполнил инпуты
});

// модальное окно
mainAddButton.addEventListener("click", () => {
  modal.classList.add("active");
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) modal.classList.remove("active");
});

//  добавление заполненной строки в таблицу
createRowButton.addEventListener("click", () => {
  let rnd = Math.random();
  let emptyInputs = false; // пустая ячейка
  tabelInputs.forEach((el, i) => {
    if (el.value.length === 0) {
      emptyInputs = true;
      tabelInputs[i].classList.remove("input-required");
      tabelInputs[i].classList.add("input-required");
    } // проверка на пустой инпут
  });
  if (!emptyInputs) {
    tabel.append(tabelTemplate.content.cloneNode(true)); // клонирование шаблонаи добавление в таблу
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
    ); // удаление строки

    newRow.setAttribute("data-row", `${rnd}`);
    newRowLabel.setAttribute("for", `${rnd}`);
    newRowInput.setAttribute("id", `${rnd}`);
    console.log(tabelInputs);

    // tabelInputs.forEach((el) => (el.value = "")); // очистка инпута
    modal.classList.remove("active");
  } else {
    console.log("добавь");
    console.log(emptyInputs);
  }
});
