function addRow() {
    // Get the table body element
    const tableBody = document.querySelector('#data-table tbody');
    
    // Create a new row and cells
    const newRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const ageCell = document.createElement('td');
    const cityCell = document.createElement('td');
    
    // Add content to the cells
    nameCell.textContent = 'New Person';
    ageCell.textContent = '20';
    cityCell.textContent = 'San Francisco';
    
    // Append the cells to the row
    newRow.appendChild(nameCell);
    newRow.appendChild(ageCell);
    newRow.appendChild(cityCell);
    
    // Append the new row to the table body
    tableBody.appendChild(newRow);
}
