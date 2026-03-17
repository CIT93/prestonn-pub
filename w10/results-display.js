// Results Display 

const orderSummaryDiv = document.getElementById('order-summary');
const displayTotal = orderSummaryDiv.querySelector('#display-total');
const displayQty = orderSummaryDiv.querySelector('#display-qty');
const displaySize = orderSummaryDiv.querySelector('#display-size');
const displayGift = orderSummaryDiv.querySelector('#display-gift');


export const displayOrder = function (order) {
    console.log('Showing order...');

    displayTotal.textContent = order.totalPrice;
    displayQty.textContent = order.qty;
    displaySize.textContent = order.size;

    if (order.giftWrap) {
        displayGift.textContent = 'Yes';
    } else {
        displayGift.textContent = 'No';
    }
    orderSummaryDiv.style.display = 'block';
};
export const hideOrder = function () { 
    orderSummaryDiv.style.display = 'none';
};