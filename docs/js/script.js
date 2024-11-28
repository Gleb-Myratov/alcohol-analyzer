const modalOverlay = document.getElementById("modal");
function openModal() {
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  if (event.target == modalOverlay)
    document.getElementById("modal").classList.remove("active");
}
