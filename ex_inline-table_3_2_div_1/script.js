document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.body');
    const addRowButton = document.getElementById('add-row');

    function addRow() {
        const newRow = document.createElement('div');
        newRow.classList.add('row');

        newRow.innerHTML = `
            <div class="cell"><input type="text" value="" disabled></div>
            <div class="cell"><input type="number" value="" disabled></div>
            <div class="cell"><input type="text" value="" disabled></div>
            <div class="cell">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        tableBody.appendChild(newRow);
        addEventListeners(newRow);
    }

    function toggleEdit(button) {
        const row = button.closest('.row');
        const inputs = row.querySelectorAll('input');
        const isEditing = button.textContent === 'Edit';

        inputs.forEach(input => {
            input.disabled = !isEditing;
        });

        button.textContent = isEditing ? 'Save' : 'Edit';
    }

    function deleteRow(button) {
        const row = button.closest('.row');
        row.remove();
    }

    function addEventListeners(row) {
        const editButton = row.querySelector('.edit');
        const deleteButton = row.querySelector('.delete');

        editButton.addEventListener('click', () => toggleEdit(editButton));
        deleteButton.addEventListener('click', () => deleteRow(deleteButton));
    }

    addRowButton.addEventListener('click', addRow);

    document.querySelectorAll('.body .row').forEach(row => {
        addEventListeners(row);
    });
});
