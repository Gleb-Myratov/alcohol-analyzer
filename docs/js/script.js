document
  .getElementById("alcohol-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const drink = document.getElementById("drink").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const alcoholContent = parseFloat(
      document.getElementById("alcohol-content").value
    );

    let alcoholAmount = 0;

    if (drink === "beer") {
      alcoholAmount = (quantity * alcoholContent) / 100;
    } else if (drink === "vodka") {
      alcoholAmount = (quantity * alcoholContent) / 100;
    }

    document.getElementById("total-volume").innerText = quantity + " мл";
    document.getElementById("total-alcohol").innerText =
      alcoholAmount.toFixed(2) + " мл";
  });
