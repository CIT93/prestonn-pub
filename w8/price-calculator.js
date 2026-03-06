const shirtPrice = 14.99; 
const giftWrapPrice = 1.99; 

export const calculateTotal = function(orderData) {
    let total = orderData.qty * shirtPrice;

    if (orderData.giftWrap) {
        total += giftWrapPrice;
    }
    return { totalPrice: total };
};