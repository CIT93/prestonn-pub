import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
// import * as resultsDisplay from './results-display.js'; Old code from this file remains, noted out.
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

const orderForm = document.getElementById('order-form');
const orders = []; 

const handleOrderSubmit = function (event) {
    event.preventDefault();

    const orderData = orderHandler.getFormInputs(); 
    const calculatedPrice = priceCalculator.calculateTotal(orderData); 
    const entryToSave = {
        ...orderData,
        ...calculatedPrice
    };

    const orderId = document.getElementById('order-id').value;
    if (orderId) {
        const index = orders.findIndex(function(order) {
            return order.id === orderId;
        });

        if (index !== -1) {
            entryToSave.id = orderId;
            entryToSave.timestamp = orders[index].timestamp;
            orders[index] = entryToSave;
            console.log(`Order ${orderId} updated successfully.`);
        } else {
            console.warn(`Attempted to update order with id ${orderId}, but it was not found.`);
            entryToSave.id = Date.now().toString();
            entryToSave.timestamp = new Date().toISOString();
            orders.push(entryToSave);
        }
    } else {
        entryToSave.id = Date.now().toString();
        entryToSave.timestamp = new Date().toISOString();
        orders.push(entryToSave);
        console.log("New order created.");
    }
    orderStorage.savedOrder(orders);
    
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
    document.getElementById('order-id').value = ''; 
    orderForm.reset(); 
};

const handleDelete = function(id) {
    console.log("App.js: Requesting delete for order", id);
    const index = orders.findIndex(order => order.id === id);

    if (index !== -1) {
        orders.splice(index, 1);
        orderStorage.savedOrder(orders);
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
        
        console.log(`Order ${id} deleted successfully.`);
    } else {
        console.warn(`Order ${id} not found.`);
    }
};

const handleEdit = function(id) {
    console.log("App.js: Requesting edit for order", id);
const entryToEdit = orders.find(function(order) {
    return order.id === id;
});

if (entryToEdit) {
        document.getElementById('qty').value = entryToEdit.qty;
        document.getElementById('gift-wrap').checked = entryToEdit.giftWrap;
        document.getElementById('order-id').value = entryToEdit.id;

        const sizeRadios = document.getElementsByName('size');
        for (const radio of sizeRadios) {
            if (radio.value === entryToEdit.size) {
                radio.checked = true;
            }
        }

        window.scrollTo({top: 0, behavior: 'smooth'});
        console.log(`Editing entry id ${id} form populated`);
    }
};


const init = function () {
    const loadedOrders = orderStorage.ordersData();

    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        orderList.renderOrders(orders);
        console.log("Orders loaded", orders);
    }

    orderForm.addEventListener('submit', handleOrderSubmit);
};

document.addEventListener('DOMContentLoaded', init);