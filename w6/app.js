import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js'; 
import * as orderStorage from './order-storage.js';

const orderForm = document.getElementById('order-form');
const summaryDiv = document.getElementById('order-summary');

const orders = []; // Empty array to store all orders
const handleOrderSubmit = function (event) {
    event.preventDefault();

    const orderData = orderHandler.getFormInputs(); // form data from the handler
    console.log(orderData);

    const calculatedPrice = priceCalculator.calculateTotal(orderData); // Calculate the price

    
    const newOrder = { // Marging operator uses this
        ...orderData,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    orderStorage.savedOrder(orders);
    resultsDisplay.displayOrder(newOrder);
};

const init = function () {
    const loadedOrders = orderStorage.ordersData();

    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        console.log("Orders loaded", orders);
    }

    orderForm.addEventListener('submit', handleOrderSubmit);
};

document.addEventListener('DOMContentLoaded', init);