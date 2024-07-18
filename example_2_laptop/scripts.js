document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('closeBtn')[0];
    const laptopForm = document.getElementById('laptopForm');
    const laptopTable = document.getElementById('laptopTable').getElementsByTagName('tbody')[0];

    const manageModal = document.getElementById('manageModal');
    const closeManageBtn = document.getElementsByClassName('closeManageBtn')[0];
    const addItemBtn = document.getElementById('addItemBtn');
    const newItem = document.getElementById('newItem');
    const itemList = document.getElementById('itemList');

    const brandSelect = document.getElementById('brand');
    const ramSelect = document.getElementById('ram');
    const processorSelect = document.getElementById('processor');
    const screenSizeSelect = document.getElementById('screenSize');

    let currentManageSelect;

    const defaultItems = {
        brand: ['Dell', 'HP', 'Apple'],
        ram: ['8GB', '16GB', '32GB'],
        processor: ['i5', 'i7', 'i9'],
        screenSize: ['13"', '15"', '17"']
    };

    function populateSelect(select, items) {
        select.innerHTML = '';
        items.forEach(item => {
            const option = document.createElement('option');
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
        modal.style.display = 'block';
    }

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        } else if (event.target === manageModal) {
            manageModal.style.display = 'none';
        }
    }

    laptopForm.onsubmit = function (event) {
        event.preventDefault();
        const modelName = document.getElementById('modelName').value;
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

        modal.style.display = 'none';
        laptopForm.reset();
    }

    document.getElementById('manageBrandsBtn').onclick = () => manageItems('brand', brandSelect);
    document.getElementById('manageRamBtn').onclick = () => manageItems('ram', ramSelect);
    document.getElementById('manageProcessorBtn').onclick = () => manageItems('processor', processorSelect);
    document.getElementById('manageScreenSizeBtn').onclick = () => manageItems('screenSize', screenSizeSelect);

    function manageItems(type, select) {
        currentManageSelect = select;
        itemList.innerHTML = '';
        defaultItems[type].forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            itemList.appendChild(li);
        });
        manageModal.style.display = 'block';
    }

    closeManageBtn.onclick = function () {
        manageModal.style.display = 'none';
    }

    addItemBtn.onclick = function () {
        const newItemValue = newItem.value.trim();
        if (newItemValue && !defaultItems[currentManageSelect.id].includes(newItemValue)) {
            defaultItems[currentManageSelect.id].push(newItemValue);
            populateSelect(currentManageSelect, defaultItems[currentManageSelect.id]);
            newItem.value = '';
        }
    }
});
