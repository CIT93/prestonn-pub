console.log ('App.js has successfully loaded!');
import * as orderHandler from "./order-handler.js";

const orderForm = document.getElementById('order-form'); // elements selected
const orderSummary = document.getElementById('order-summary');

const handleOrderSubmit = function(event) {
    event.preventDefault();
    const orderFormSelections = orderHandler.getOrderInputs();

    orderSummary.textContent = `Ordered ${orderFormSelections.qtyInputSelection} ${orderFormSelections.sizeRadioButtonsSelection} T-Shirt`;

    if(orderFormSelections.qtyInputSelection > 1) {
        orderSummary.textContent += `s`;
    };

    if(orderFormSelections.giftWrapCheckboxSelection === true) {
        orderSummary.textContent += ` with Gift Wrapping`;
    }
    orderSummary.textContent += '. Thank you for your purchase!';
    console.log('Order submitted & processed.');
};
const init = function() {
    orderForm.addEventListener('submit', handleOrderSubmit);
    console.log('initialized the app');
};

document.addEventListener('DOMContentLoaded', init);
