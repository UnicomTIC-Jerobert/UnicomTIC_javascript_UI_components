function addRow() {
    // Get the table body element
    const tableBody = document.querySelector('#data-table tbody');
    
    // Create a new row and cells
    const newRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const ageCell = document.createElement('td');
    const cityCell = document.createElement('td');
    const actionCell = document.createElement('td');
    
    // Create input elements for the new row
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = '';
    
    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.value = '';
    
    const cityInput = document.createElement('input');
    cityInput.type = 'text';
    cityInput.value = '';
    
    // Create delete button for the new row
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() { deleteRow(this); };
    
    // Append input elements to the cells
    nameCell.appendChild(nameInput);
    ageCell.appendChild(ageInput);
    cityCell.appendChild(cityInput);
    actionCell.appendChild(deleteButton);
    
    // Append the cells to the row
    newRow.appendChild(nameCell);
    newRow.appendChild(ageCell);
    newRow.appendChild(cityCell);
    newRow.appendChild(actionCell);
    
    // Append the new row to the table body
    tableBody.appendChild(newRow);
}

function deleteRow(button) {
    // Get the row of the button
    const row = button.parentNode.parentNode;
    // Remove the row from the table
    row.parentNode.removeChild(row);
}
