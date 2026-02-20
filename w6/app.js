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
    const newOrder = { 
        ...orderData,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    orderStorage.savedOrder(orders);
    orderList.renderOrders(orders); 

    // resultsDisplay.displayOrder(newOrder);
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