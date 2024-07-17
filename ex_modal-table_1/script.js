document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const addRowButton = document.getElementById('add-row');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('modal-title');
    const saveButton = document.getElementById('save-btn');

    let editingRow = null;

    function openModal(title, row = null) {
        modalTitle.textContent = title;
        if (row) {
            document.getElementById('name').value = row.cells[0].textContent;
            document.getElementById('age').value = row.cells[1].textContent;
            document.getElementById('city').value = row.cells[2].textContent;
        } else {
            modalForm.reset();
        }
        editingRow = row;
        modal.style.display = 'block';
    }

    function closeModalWindow() {
        modal.style.display = 'none';
    }

    function addRow() {
        openModal('Add Row');
    }

    function saveRow(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const city = document.getElementById('city').value;

        if (editingRow) {
            editingRow.cells[0].textContent = name;
            editingRow.cells[1].textContent = age;
            editingRow.cells[2].textContent = city;
        } else {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${age}</td>
                <td>${city}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
            addEventListeners(newRow);
        }
        closeModalWindow();
    }

    function editRow(button) {
        const row = button.parentNode.parentNode;
        openModal('Edit Row', row);
    }

    function deleteRow(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }

    function addEventListeners(row) {
        const editButton = row.querySelector('.edit');
        const deleteButton = row.querySelector('.delete');

        editButton.addEventListener('click', () => editRow(editButton));
        deleteButton.addEventListener('click', () => deleteRow(deleteButton));
    }

    addRowButton.addEventListener('click', addRow);
    closeModal.addEventListener('click', closeModalWindow);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModalWindow();
        }
    });
    modalForm.addEventListener('submit', saveRow);

    document.querySelectorAll('#data-table tbody tr').forEach(row => {
        addEventListeners(row);
    });
});
