const tabel = document.querySelector(".tabel__content");

const removeRowButtons = document.querySelectorAll(".tabel__remove-button");
const mainAddButton = document.getElementById("main-add-button");
const createRowButton = document.getElementById("create-row-button");

const modal = document.getElementById("modal");
const rowInpiuts = document.getElementById("row-inputs");
const tabelInputs = document.querySelectorAll(".tabel__cell--input");

const tabelTemplate = document.querySelector(".tabel__template");

removeRowButtons.forEach((el, i) => {
  el.addEventListener("click", () => removeRow(el, i));
  // el.setAttribute("data-row-remove", `${i}`);
});
function removeRow(el, i) {
  el.parentElement.parentElement.remove();
}

mainAddButton.addEventListener("click", () => {
  modal.classList.add("active");
});

modal.addEventListener("click", () => {
  if (event.target == modal) modal.classList.remove("active");
});

createRowButton.addEventListener("click", () => {
  let emptyInputs = false;
  tabelInputs.forEach((el) => {
    if (el.value.length === 0) emptyInputs = true;
  });
  if (!emptyInputs) {
    tabel.append(tabelTemplate.content.cloneNode(true));
    let newRow = tabel.querySelectorAll(".tabel__row");
    let newRowCells =
      newRow[newRow.length - 1].querySelectorAll(".tabel__cell");
    for (let i = 0; i < 5; i++) {
      newRowCells[i + 1].textContent = tabelInputs[i].value;
    }
    modal.classList.remove("active");
  } else {
    console.log("добавь");
    console.log(emptyInputs);
  }
});
