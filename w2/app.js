console.log('Hello from app.js! Your javascript is connected and running!')
// --- Part 1: Select HTML Elements ----
// We use document.getElementById() to get a reference to an element by its unique ID.
// We store these references in 'const' variables because the elements themselves won't change.

const totalDisplay = document.getElementById("total-display")
const addItemButton = document.getElementById("add-item-btn");
const itemPrice = 15;

// These variables will change as the user interacts with the page.

let totalCost = 0;

// --- Part 2: Define and call handleButtonClick Function ---
// A function is a block of code designed to perform a particular task.

function handleButtonClick()

{
   // totalCost = totalCost + 1;
   // increase totalCost by 1 each time the button is clicked

   totalCost += 1;

        // Template strings (literal) to easily combine our variables and text into one message

   let message = `Hello You have clicked the button ${totalCost} time(s).`;

    // This is basic decision-making in JavaScript!
    // Use a simple 'if' statement to make our page react differently based on totalCost.
    if (totalCost >= 5) {
        // We can even change the style of an HTML element directly with JavaScript!
        // We can even change the style of an HTML element directly with JavaScript!
        message += ' WOW, you are a super clicker!';
        totalDisplay.style.color = 'purple';
    } else {
        totalDisplay.style.color = '#333';

    }
    // Update the text content of our paragraph element on the page
    // This is how JavaScript makes changes visible on the web page.
    totalDisplay.textContent = message;

   console.log(`Button clicked! Current total cost ${totalCost}`)
};

document.addEventListener('DOMContentLoaded', function(){
    // --- Part 3: Make the Button Clickable (Event Listener) ---
    // This part ensures our JavaScript code runs only AFTER the HTML is fully loaded and parsed.
    // The 'DOMContentLoaded' event is perfect for this. It fires when the HTML document is ready.

    console.log('DOM fully loaded and parsed, App is ready for interaction')
    // Attach an event listener to our 'addItemButton'.
    // When 'addItemButton' receives a 'click' event, the 'handleButtonClick' function will execute.

    addItemButton.addEventListener('click', handleButtonClick);

    totalDisplay.textContent = `Welcome Click the button below to start counting`
})