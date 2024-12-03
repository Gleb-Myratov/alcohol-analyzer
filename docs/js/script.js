const modalOverlay = document.getElementById("modal");
const table = document.querySelector(".table__content");
const deleteRowButtons = document.querySelectorAll(".table__remove-button");

deleteRowButtons[2].addEventListener("click", deleteRow1);

function openModal() {
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  if (event.target == modalOverlay)
    document.getElementById("modal").classList.remove("active");
}
/* function deleteRow(numberRow) {
  document.querySelector(`.table__row[data-row="${numberRow}"]`).remove();
  table.style.gridTemplateRows = `repeat(${table.children.length}, 1fr)`;
  // table.classList.add("new-grid-style");
} */
const rowInpiuts = document.getElementById("row-inputs");

function test() {
  console.log(rowInpiuts.querySelector("input").value);
}

function deleteRow1() {
  console.dir(this);
}
