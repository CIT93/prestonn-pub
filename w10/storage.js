// this module handles interactions with localStorage for our carbon footprint entries
// SCREAMING_SNAKE_CASE - This naming convention is typically reserved for global constants whose value should never change throughout the lifetime of the application.

const LOCAL_STORAGE_KEY = 'carbonFootprintEntries';

// localStorage.setItem(LOCAL_STORAGE_KEY, "Anthony");
// localStorage.setItem(LOCAL_STORAGE_KEY, 12);
// localStorage.setItem(LOCAL_STORAGE_KEY, [1, 2, 3]);

// localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([1, 2, 3]));
// const localstorageValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
// console.log(`Local Storage Value: ${typeof localstorageValue} ${localstorageValue}`);

export const saveEntries = function(entries) {

    // localStorage can only store strings. We must convert our JS array of objects
    // into a JSON string using JSON.stringify() before saving.
    // Try Catch Block - Error catching

    try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
    console.log('Data saved to local storage')
}
     catch (error) {
        console.error(`Error saving to data: ${error} `)
    }

};

// Generates a simple, unique ID for a new entry based on the current timestamp.
// This function is now part of the storage module as its related to the data management.
// @returns {string} a unique ID string
export const generateUniqueId = function () {
    return Date.now().toString();
}

// Loads all carbon footprint entries from localStorage.
// @returns {Array} An array of carbon footprint entry objects. Returns an empty array if no data is found or if parsing fails.

export const loadEntries = function () {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString) {
            // If data exists, parse the JSON string back into a JavaScript array/object.
            return JSON.parse(dataString);
        }
        // if no data is found in localStorage, return an empty array
        return [];

    } catch (e) {
        console.error(`Error loading entries from localStorage: ${e}`);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    
};
export const clearAllEntries = function() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log('All entries clear from localStorage');
};