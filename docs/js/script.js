const modalOverlay = document.getElementById("modal");
const table = document.querySelector(".table__content");
function openModal() {
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  if (event.target == modalOverlay)
    document.getElementById("modal").classList.remove("active");
}
function deleteRow(numberRow) {
  document.querySelector(`.table__row[data-row="${numberRow}"]`).remove();
  table.style.gridTemplateRows = `repeat(${table.children.length}, 1fr)`;
  // table.classList.add("new-grid-style");
}
console.log(document.styleSheets[1]);
