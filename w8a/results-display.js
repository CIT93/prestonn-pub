const resultsContainer = document.getElementById('results'); // we use resultsContainer.querySelector() to get elements inside the resultsContainer.


const totalFootprintDisplay = resultsContainer.querySelector('#totalFootprint');
const householdFootprintDisplay = resultsContainer.querySelector('#householdFootprint');
const homesizeFootprintDisplay = resultsContainer.querySelector('#homeSizeFootprint');
const foodDietFootprintDisplay = resultsContainer.querySelector('#foodDietFootprint');
const foodPackagingFootprintDisplay = resultsContainer.querySelector('#foodPackagingFootprint');



export const displayResults = function(results){ // Display the calculated carbon footprint results in the results section.
    console.log ('inside the displayResults function');
    totalFootprintDisplay.textContent = `Total Size: ${results.totalFootprint.toFixed(0)} Points`;
    householdFootprintDisplay.textContent = `Household Size: ${results.householdFootprint.toFixed(0)} Points`;
    homesizeFootprintDisplay.textContent = `Home Size: ${results.homeSizeFootprint.toFixed(0)} Points`;
    foodDietFootprintDisplay.textContent = `Food Diet: ${results.dietTypeFootprint.toFixed(0)} Points`;
    foodPackagingFootprintDisplay.textContent = `Food Packaging: ${results.dietTypeFootprint.toFixed(0)} Points`;

    resultsContainer.style.display = 'block';

};
// Hides the Results section
export const hideResults = function() {
    resultsContainer.style.display = 'none';
};