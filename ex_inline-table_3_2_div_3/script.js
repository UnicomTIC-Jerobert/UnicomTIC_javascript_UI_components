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
            <div class="cell actions">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
        `;

        tableBody.appendChild(newRow);
        addEventListeners(newRow);
    }

    function toggleEdit(button) {
        const row = button.closest('.row');
        const inputs = row.querySelectorAll('input');
        const isEditing = button.querySelector('i').classList.contains('fa-edit');

        inputs.forEach(input => {
            input.disabled = !isEditing;
        });

        button.innerHTML = isEditing ? '<i class="fas fa-save"></i>' : '<i class="fas fa-edit"></i>';
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
