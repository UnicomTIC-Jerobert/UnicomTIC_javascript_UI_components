document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const addRowButton = document.getElementById('add-row');

    function addRow() {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><input type="text" value="" disabled></td>
            <td><input type="number" value="" disabled></td>
            <td><input type="text" value="" disabled></td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        tableBody.appendChild(newRow);
        addEventListeners(newRow);
    }

    function toggleEdit(button) {
        const row = button.closest('tr');
        const inputs = row.querySelectorAll('input');
        const isEditing = button.textContent === 'Edit';

        inputs.forEach(input => {
            input.disabled = !isEditing;
        });

        button.textContent = isEditing ? 'Save' : 'Edit';
    }

    function deleteRow(button) {
        const row = button.closest('tr');
        row.remove();
    }

    function addEventListeners(row) {
        const editButton = row.querySelector('.edit');
        const deleteButton = row.querySelector('.delete');

        editButton.addEventListener('click', () => toggleEdit(editButton));
        deleteButton.addEventListener('click', () => deleteRow(deleteButton));
    }

    addRowButton.addEventListener('click', addRow);

    document.querySelectorAll('#data-table tbody tr').forEach(row => {
        addEventListeners(row);
    });
});
