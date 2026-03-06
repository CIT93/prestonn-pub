let moduleCallbacks = {};

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
        <td>
        <button class="edit-btn" data-id="${order.id}">Edit</button>
        <button class="delete-btn" data-id="${order.id}">Delete</button>
        </td>
    `;
    return row;
};

tbody.addEventListener('click', function(event) {

    const target = event.target;
    const id = target.dataset.id;

    if (!id) return;

    if (target.classList.contains('delete-btn')) {
        if (moduleCallbacks.onDelete) {
            moduleCallbacks.onDelete(id);
        }
    }

    if (target.classList.contains('edit-btn')) {
        if (moduleCallbacks.onEdit) {
            moduleCallbacks.onEdit(id);
        }
    }
});

export const renderOrders = function(orders, callbacks) {
    // Save callbacks only if they are provided
    if (callbacks) {
        moduleCallbacks = callbacks;
    }

    tbody.innerHTML = '';
    console.log('Inside renderOrders updating order history');
    
    for (const order of orders) {
        const rowElement = createOrderRow(order);
        tbody.appendChild(rowElement);
    }
};