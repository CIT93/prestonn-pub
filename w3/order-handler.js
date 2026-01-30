
const orderForm = document.getElementById('order-form'); // Query Selector functions
const qtyInput = orderForm.querySelector('#qty');
const giftWrapCheckbox = orderForm.querySelector('#gift-wrap');
const sizeRadioButtons = orderForm.querySelectorAll('input[name="size"]');

const getSelectedRadioValue = function(radioButtons) { // creates a helper function. Also writes a function to figure out which size radio button is checked
    for (const radio of radioButtons) {
        if (radio.checked) {
        console.log(`${radio.value} is ${radio.checked}`);
        return radio.value;
        }
    }
};

export const getOrderInputs = function() { // creates and exports a function
    console.log('getOrderInputs is running');
    const orderFormSelections = {
        qtyInputSelection: parseInt(qtyInput.value),
        giftWrapCheckboxSelection: giftWrapCheckbox.checked,
        sizeRadioButtonsSelection: getSelectedRadioValue(sizeRadioButtons)
    };

    console.log('getOrderInputs');
    return orderFormSelections;
};