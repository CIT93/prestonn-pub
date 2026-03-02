// --- Part 3: implementing form-handler.js ---

//--- Part 1: Code clearForm and getFormInput
// Collects all relevant input values from the form for Household Size, Home Size, and Food Choices.

const carbonFootprintForm = document.getElementById('carbonFootprintForm'); // Get a reference to the main form element by its ID

const householdMembersInput = carbonFootprintForm.querySelector('#householdMember');; // Using form.querySelector() is good practice for elements inside a specific parent (our form)

const homeSquareFootageInput = carbonFootprintForm.querySelector('#homeSquareFootage'); // Home Size Reference

const isApartmentInput = carbonFootprintForm.querySelector('#isApartment'); // Apartment Checkbox Reference

const dietTypeRadios = carbonFootprintForm.querySelectorAll('input[name="dietType"]'); // this returns a node list, which is array "like"
const foodPackagingRadios = carbonFootprintForm.querySelectorAll('input[name="foodPackaging"]');

const getSelectedRadioValue = function(radioButtons) {
    // Loop over the node list to find what button was checked (clicked)
    // let selectDietType = null;
for(const radio of radioButtons) {;
    if(radio.checked) {
        // console.log (`${radio.value} has the attribute of ${radio.checked}`);
        return radio.value;
    }
};
}

// An Array is a list of items array[index]
// @returns {Object} An object containing all the collected input values.

export const getFormInputs = function () {
    console.log('Get Form Inputs');

    return {

        householdMembers: parseInt(householdMembersInput.value) || 1, 
        
        homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
        isApartment: isApartmentInput.checked,
        dietType: getSelectedRadioValue(dietTypeRadios),
        foodPackaging: getSelectedRadioValue(foodPackagingRadios)
    }
};

export const clearForm = function () {
    carbonFootprintForm.reset();  

    householdMembersInput.value = 1; 
    
    homeSquareFootageInput.value = 0;
    dietTypeRadios[0].checked = true;
    foodPackagingRadios[0].checked = true;
    console.log('Clear Form');
}