// Sample data storage (simulated database)
let televisions = [];

// DOM elements
const modelNameInput = document.getElementById("modelName");
const brandSelect = document.getElementById("brand");
const screenSizeSelect = document.getElementById("screenSize");
const resolutionSelect = document.getElementById("resolution");
const smartTvSelect = document.getElementById("smartTv");
const deviceTableBody = document.querySelector("#deviceTable tbody");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".closeBtn");
const manageBrandBtn = document.getElementById("manageBrandsBtn");
const manageScreenSizeBtn = document.getElementById("manageScreenSizeBtn");
const manageResolutionBtn = document.getElementById("manageResolutionBtn");

// Manage button functionality
manageBrandBtn.addEventListener("click", () => {
  // Simulate managing brands (add/edit/delete)
  alert("Manage Brands");
});

manageScreenSizeBtn.addEventListener("click", () => {
  // Simulate managing screen sizes (add/edit/delete)
  alert("Manage Screen Sizes");
});

manageResolutionBtn.addEventListener("click", () => {
  // Simulate managing resolutions (add/edit/delete)
  alert("Manage Resolutions");
});

// Function to add a new television to the table
function addTelevision(modelName, brand, screenSize, resolution, smartTv) {
  // Create new television object
  const television = {
    modelName,
    brand,
    screenSize,
    resolution,
    smartTv,
  };

  // Add television to array (simulated database)
  televisions.push(television);

  // Update the table display
  updateTable();
}

// Function to update the table with televisions
function updateTable() {
  // Clear current table rows
  deviceTableBody.innerHTML = "";

  // Loop through televisions and add rows to the table
  televisions.forEach((television, index) => {
    const row = `<tr>
                        <td>${television.modelName}</td>
                        <td>${television.brand}</td>
                        <td>${television.screenSize}</td>
                        <td>${television.resolution}</td>
                        <td>${television.smartTv}</td>
                    </tr>`;
    deviceTableBody.innerHTML += row;
  });
}

// Event listener for form submission (add television)
document
  .getElementById("deviceForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const modelName = modelNameInput.value;
    const brand = brandSelect.value;
    const screenSize = screenSizeSelect.value;
    const resolution = resolutionSelect.value;
    const smartTv = smartTvSelect.value;

    // Add television to the array
    addTelevision(modelName, brand, screenSize, resolution, smartTv);

    // Reset form fields
    modelNameInput.value = "";
    brandSelect.value = "";
    screenSizeSelect.value = "";
    resolutionSelect.value = "";
    smartTvSelect.value = "";

    // Close modal
    modal.style.display = "none";
  });

// Event listener for modal open button
openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Event listener for close button in modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close modal if user clicks outside of it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Initial table update
updateTable();
