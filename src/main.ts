import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Miles Biked";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button element
const button = document.createElement('button');

// Set the button's text
button.textContent = 'Click Me 🚴';

// Add an event listener to handle clicks
button.addEventListener('click', () => {
  alert('Button was clicked!');
});

/*button.style.position = 'absolute';
button.style.top = '50px'; // adjust values as needed
button.style.left = '50px';*/
// Append the button to the body (or any other container element)
document.body.appendChild(button);