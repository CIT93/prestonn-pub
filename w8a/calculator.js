const calculateHouseholdPoints = function (householdMembers) {
    console.log(householdMembers);
        if(householdMembers === 1) return 14;
        if(householdMembers === 2) return 12;
        if(householdMembers === 3) return 10;
        if(householdMembers === 4) return 8;
        if(householdMembers === 5) return 6; // 6+ people total
        if(householdMembers > 5) return 4;
        return 0; // Default or invalid input
};

const calculateHomeSizePoints = function(homeSquareFootage, isApartment) {
    if(isApartment) return 2;
    else if(homeSquareFootage > 2000) return 10;
    else if(homeSquareFootage >= 1000) return 7;
    else if(homeSquareFootage > 0) return 4;
    return 0; // for invalid input

};

const calculateFoodDietPoints = function(dietType) {    
    switch(dietType) {
        case 'meatHeavy': return 10;
        case 'average': return 8;
        case 'vegetarian': return 4;
        case 'vegan': return 2;
        default: return 0;
    }
};

const calculateFoodPackagingPoints = function(foodPackaging) {
    switch(foodPackaging) {
        case 'prePackaged': return 12;
        case 'balanced': return 6;
        case 'fresh': return 2;
        default: return 0;
    }
}

// This module contains the core logic for calculating carbon footprint points.
// Calculate points for each category using our dedicated helper functions
// This function orchestrates calls to the smaller, specialized calculation functions.
// It exports 'calculateFootprint' so other modules (like app.js) can use it.
// Return the breakdown of points for each category, and the total (for now we will just setup a key and return it's value)
export const calculateFootprint = function(data) {
    console.log('inside calculateFootprint function in the calculator.js module');
            const householdPoints = calculateHouseholdPoints(data.householdMembers);
            const homeSizePoints = calculateHomeSizePoints(data.homeSquareFootage, data.isApartment);
            const dietTypePoints = calculateFoodDietPoints(data.dietType);
            const foodPackagingPoints = calculateFoodPackagingPoints(data.foodPackaging);
            const totalFootprintPoints = householdPoints + homeSizePoints + dietTypePoints + foodPackagingPoints;
            
        return {
    totalFootprint: totalFootprintPoints,
    householdFootprint: householdPoints,
    homeSizeFootprint: homeSizePoints,
    dietTypeFootprint: dietTypePoints,
    footPackagingFootprint: foodPackagingPoints
}
}