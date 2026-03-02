console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js'

// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
// We use 'const' because the 'carbonFootprintEntries' variable will always refer
// to the same array, even though the array's contents will change (items added).
const carbonFootprintEntries = []; // Empty Array Literal - Global Variable


// References the main carbon footprint form.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the input field for the number of household members.
// const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// References the clear form button.
const clearFormButton = document.getElementById('clearFormButton');

const clearAllDataButton = document.getElementById('clearAllDataButton');

let isConfirmingClearAll = false;
let ClearAllTimeoutID = null;

const resetClearAllButton = function () {
    // console.log(ClearAllTimeoutID);
    if(ClearAllTimeoutID) {
        clearTimeout(ClearAllTimeoutID); 
    }
    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
};

const resetAllUIStates = function() {
    resetClearAllButton();
};
const handleFormSubmit = function(event) {
    event.preventDefault();
    const formData = formHandler.getFormInputs();
    const calculatedResults = calculator.calculateFootprint(formData);

    const newEntry = {
        ...formData,
        ...calculatedResults,
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString(),
    };
    carbonFootprintEntries.push(newEntry);
    storage.saveEntries(carbonFootprintEntries);

    resultsDisplay.displayResults(calculatedResults);
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    
    formHandler.clearForm();
    resetAllUIStates();
};

const performClearAllData = function() {
    carbonFootprintEntries.length = 0;
    console.log("In-Memory array cleared:", carbonFootprintEntries);
    storage.clearAllEntries
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    formHandler.clearForm();
    resultsDisplay.hideResults();
}
 
// Handles the clear form button click, resetting form fields.
const handleClearForm = function () {
    formHandler.clearForm();
    // carbonFootprintForm.reset();
    // householdMembersInput.value = 1;
    resultsDisplay.hideResults();
    console.log('Clear button clicked')
    resetAllUIStates();
}
// Handles the Delete button
const handleDeleteEntry = function(id) {
    console.log(`Delete button clicked for ID: ${id} functionality added in week 7.1`);
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry){
        return entry.id === id;
    });
    if(indexToDelete !== -1) {
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log(`Entry removed from memory`);
        storage.saveEntries(carbonFootprintEntries);
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        if(carbonFootprintEntries.length === 0){
            resultsDisplay.hideResults();
            formHandler.clearForm();
        }
        resetAllUIStates();
    } else {
        console.log('Did not find index')
        resetAllUIStates();
    }
}
// Handles the Edit button
const handleEditEntry = function(id) {
    console.log(`Edit button clicked for ID: ${id} functionality added in week 7.1`);
    
    resetAllUIStates();
}
// Initializes the application by setting up event listeners.
const init = function() {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.')
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultsDisplay.hideResults();
    // On startup, attempt to load any previously saved entries from localStorage.
    const loadedEntries = storage.loadEntries();
    if(loadedEntries.length > 0) {
        // If no data is found in localStorage, return an empty array.
        // carbonFootprintEntries array using the spread operator (...).
        carbonFootprintEntries.push(...loadedEntries);
        console.log('Entries Loaded from localStorage')
    } else {
        console.log('No entries found in localStorage Starting fresh')
    }

    // handleDeleteEntry("1772071745589")

    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    clearAllDataButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        if(isConfirmingClearAll) {
            performClearAllData();
        } else {
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? click again';
            clearAllDataButton.classList.add('confirm-state');
            ClearAllTimeoutID = setTimeout(function () {
                resetClearAllButton();
                console.log('Clear all confirmation timed out');
            }, 3000); // 3 seconds
        }
        
    });

    document.addEventListener('click', function(event){
        console.log(event.target);
        if(isConfirmingClearAll && event.target !== clearAllDataButton) {
            resetClearAllButton();
        } 
    })
};

// Attaches the initialization function to the DOMContentLoaded event.
document.addEventListener('DOMContentLoaded', init);