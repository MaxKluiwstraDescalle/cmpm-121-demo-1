import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let counter: number = 0;
let growth : number = 0;
let rate: number = 0;

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
const buttonUp = document.createElement("button");

// Set the button's text
button.textContent = "Click Me 🚴";
buttonUp.textContent = "Buy Teammates!";

buttonUp.style.top = "600px";
buttonUp.style.left = "550px"

// Add an event listener to handle clicks
button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `Miles: ${counter}`;
});
let lastTime = 0;
let fps = 60;
let increment = 0;

buttonUp.addEventListener("click", () => {
    if(counter>= 10){
        counter-= 10;
        rate += 1;
        growthRate(rate);
        
    }
  });

buttonUp.disabled= true;

function updateButtonState(){
    buttonUp.disabled = counter < 10;
}

function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  fps = 1000 / deltaTime;
  increment = growth / fps;
  counter += increment;
  counterDisplay.innerHTML = `Miles: ${counter.toFixed(2)}`;

  lastTime = currentTime;

  updateButtonState();
  requestAnimationFrame(updateCounter);
}

function growthRate(newRate: number){
    growth = newRate
}


// Append the button to the body (or any other container element)
document.body.appendChild(button);
document.body.appendChild(buttonUp);
requestAnimationFrame(updateCounter);

