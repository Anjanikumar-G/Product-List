document.addEventListener("DOMContentLoaded", function () {
  let maxProducts = 8;
  let productTable = document
    .getElementById("productTable")
    .querySelector("tbody");
  let addButton = document.getElementById("addButton");
  let showOrderButton = document.getElementById("showOrderButton");
  let orderSummary = document.getElementById("orderSummary");
  let orderTable = document.getElementById("orderTable").querySelector("tbody");
  let whatIsMyOrderButton = document.getElementById("whatIsMyOrderButton");

  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("dropbtn")) {
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        content.style.display = "none";
      });
    }
  });

  function initializeDropdown(dropdown) {
    let button = dropdown.querySelector(".dropbtn");
    let links = dropdown.querySelectorAll(".dropdown-content a");

    button.addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        if (content !== dropdown.querySelector(".dropdown-content")) {
          content.style.display = "none";
        }
      });
      dropdown.querySelector(".dropdown-content").style.display = "block";
    });

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        button.textContent = this.textContent;
        button.dataset.value = this.dataset.value;
        dropdown.querySelector(".dropdown-content").style.display = "none";
      });
    });
  }

  document.querySelectorAll(".dropdown").forEach(initializeDropdown);

  addButton.addEventListener("click", function () {
    let rows = document.querySelectorAll(".product-row");
    let lastRow = rows[rows.length - 1];
    let productButton = lastRow.querySelector(".product-dropdown .dropbtn");
    let quantityButton = lastRow.querySelector(".quantity-dropdown .dropbtn");

    if (productButton.dataset.value && quantityButton.dataset.value) {
      if (rows.length < maxProducts) {
        let newRow = lastRow.cloneNode(true);
        newRow.querySelector(".product-dropdown .dropbtn").textContent =
          "Choose Product";
        newRow
          .querySelector(".product-dropdown .dropbtn")
          .removeAttribute("data-value");
        newRow.querySelector(".quantity-dropdown .dropbtn").textContent =
          "Choose Quantity";
        newRow
          .querySelector(".quantity-dropdown .dropbtn")
          .removeAttribute("data-value");
        productTable.appendChild(newRow);
        newRow.querySelectorAll(".dropdown").forEach(initializeDropdown);
      }
    } else {
      alert("Please select both Product and Quantity");
    }
  });

  showOrderButton.addEventListener("click", function () {
    let rows = document.querySelectorAll(".product-row");
    let orderList = [];

    rows.forEach((row) => {
      let productButton = row.querySelector(".product-dropdown .dropbtn")
        .dataset.value;
      let quantityButton = row.querySelector(".quantity-dropdown .dropbtn")
        .dataset.value;
      if (productButton && quantityButton) {
        orderList.push({ product: productButton, quantity: quantityButton });
      }
    });

    if (orderList.length > 0) {
      orderTable.innerHTML = "";
      orderList.forEach((item) => {
        let row = orderTable.insertRow();
        row.insertCell(0).innerText = item.product;
        row.insertCell(1).innerText = item.quantity;
      });

      orderSummary.style.display = "block";
      whatIsMyOrderButton.style.display = "block";
    } else {
      alert("No products selected");
    }
  });

  whatIsMyOrderButton.addEventListener("click", function () {
    let orderList = [];
    let rows = orderTable.querySelectorAll("tr");
    rows.forEach((row) => {
      let cells = row.querySelectorAll("td");
      orderList.push(`${cells[0].innerText}: ${cells[1].innerText}`);
    });

    let orderText = orderList.join(", ");
    let speech = new SpeechSynthesisUtterance(orderText);
    window.speechSynthesis.speak(speech);
  });
});
