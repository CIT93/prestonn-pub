// step 1 select the elements using querySelectorAll for the radios
const orderForm = document.getElementById("order-form");
const qtyInput = document.getElementById('qty');
const giftWrapCheckbox = document.getElementById('gift-wrap');
const sizeRadios = document.querySelectorAll('input[name="size"]');

// Helper function:
const getSelectedRadioValue = function (radioButtons) {
    for (const radio of radioButtons) {
        if (radio.checked) {
            return radio.value;
        }
    }
};

export const getFormInputs = function () { 
    console.log('Getting order inputs...');

    const selectedSize = getSelectedRadioValue(sizeRadios);

    return {
        qty: parseInt(qtyInput.value),
        size: selectedSize,
        giftWrap: giftWrapCheckbox.checked
    };
};