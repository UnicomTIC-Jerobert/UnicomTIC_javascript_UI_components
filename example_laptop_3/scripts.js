document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementsByClassName("closeBtn")[0];
  const laptopForm = document.getElementById("laptopForm");
  const laptopTable = document
    .getElementById("laptopTable")
    .getElementsByTagName("tbody")[0];

  const brandSelect = document.getElementById("brand");
  const ramSelect = document.getElementById("ram");
  const processorSelect = document.getElementById("processor");
  const screenSizeSelect = document.getElementById("screenSize");

  let currentManageSelect;

  const defaultItems = {
    brand: ["Dell", "HP", "Apple"],
    ram: ["8GB", "16GB", "32GB"],
    processor: ["i5", "i7", "i9"],
    screenSize: ['13"', '15"', '17"'],
  };

  function populateSelect(select, items) {
    select.innerHTML = "";
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });
  }

  populateSelect(brandSelect, defaultItems.brand);
  populateSelect(ramSelect, defaultItems.ram);
  populateSelect(processorSelect, defaultItems.processor);
  populateSelect(screenSizeSelect, defaultItems.screenSize);

  openModalBtn.onclick = function () {
    modal.style.display = "block";
  };

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  laptopForm.onsubmit = function (event) {
    event.preventDefault();
    const modelName = document.getElementById("modelName").value;
    const brand = brandSelect.value;
    const ram = ramSelect.value;
    const processor = processorSelect.value;
    const screenSize = screenSizeSelect.value;

    const row = laptopTable.insertRow();
    row.insertCell(0).textContent = modelName;
    row.insertCell(1).textContent = brand;
    row.insertCell(2).textContent = ram;
    row.insertCell(3).textContent = processor;
    row.insertCell(4).textContent = screenSize;

    modal.style.display = "none";
    laptopForm.reset();
  };

  document.getElementById("manageBrandsBtn").onclick = () =>
    manageItems("brand", brandSelect);
  document.getElementById("manageRamBtn").onclick = () =>
    manageItems("ram", ramSelect);
  document.getElementById("manageProcessorBtn").onclick = () =>
    manageItems("processor", processorSelect);
  document.getElementById("manageScreenSizeBtn").onclick = () =>
    manageItems("screenSize", screenSizeSelect);

  function manageItems(type, select) {
    currentManageSelect = select;
    const formGroup = select.parentElement;
    const manageView = document.createElement("div");
    manageView.classList.add("manage-view");

    const newItemInput = document.createElement("input");
    newItemInput.type = "text";
    newItemInput.placeholder = `New ${type}`;

    const addItemButton = document.createElement("button");
    addItemButton.textContent = "Add Item";
    addItemButton.onclick = function () {
      const newItemValue = newItemInput.value.trim();
      if (
        newItemValue &&
        !defaultItems[currentManageSelect.id].includes(newItemValue)
      ) {
        defaultItems[currentManageSelect.id].push(newItemValue);
        populateSelect(
          currentManageSelect,
          defaultItems[currentManageSelect.id]
        );
        newItemInput.value = "";
        formGroup.removeChild(manageView);
        formGroup.appendChild(select);
        formGroup.appendChild(formGroup.querySelector("button"));
      }
    };

    const itemList = document.createElement("ul");
    defaultItems[type].forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      itemList.appendChild(li);
    });

    manageView.appendChild(newItemInput);
    manageView.appendChild(addItemButton);
    manageView.appendChild(itemList);

    formGroup.removeChild(select);
    formGroup.removeChild(formGroup.querySelector("button"));
    formGroup.appendChild(manageView);
  }
});
