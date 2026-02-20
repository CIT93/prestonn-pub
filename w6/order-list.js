const tbody = document.getElementById('order-table-body');
const formatDateForDisplay = function(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

const createOrderRow = function(order) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${formatDateForDisplay(order.timestamp)}</td>
        <td>${order.qty}</td>
        <td>${order.size}</td>
        <td>$${order.totalPrice.toFixed(2)}</td>
        <td class="action-cell">
            <button class="action-button edit">Edit</button>
            <button class="action-button delete">Delete</button>
        </td>
    `;
    return row;
};
export const renderTable = function(orders) {
    tbody.innerHTML = '';
    console.log('Inside renderTable: updating order history');
    for (const order of orders) {
        const rowElement = createOrderRow(order);
        tbody.appendChild(rowElement);
    }
};