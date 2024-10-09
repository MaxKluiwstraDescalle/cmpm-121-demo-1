import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let counter: number = 0;

const gameName = "Miles Biked";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create and append the counter display
const counterDisplay = document.createElement("p");
counterDisplay.innerHTML = `Counter: ${counter}`;
counterDisplay.id = "counterDisplay";
app.append(counterDisplay);

// Create the button element
const button = document.createElement("button");

// Set the button's text
button.textContent = "Click Me 🚴";

// Add an event listener to handle clicks
button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `Counter: ${counter}`;
});

setInterval(() => {
    counter += 1;
    counterDisplay.innerHTML = `Counter: ${counter}`;
  }, 1000);


// Append the button to the body (or any other container element)
document.body.appendChild(button);


