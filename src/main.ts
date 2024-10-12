import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let counter: number = 0;
let growth: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Teammate", cost: 10, rate: 0.1 },
  { name: "Coach", cost: 100, rate: 2 },
  { name: "Team", cost: 1000, rate: 50 },
];

const purchaseCount: { [key: string]: number } = {
  Teammate: 0,
  Coach: 0,
  Team: 0,
};

const purchaseCounters: { [key: string]: HTMLSpanElement } = {
  Teammate: document.createElement("span"),
  Coach: document.createElement("span"),
  Team: document.createElement("span"),
};

const gameName = "Miles Biked";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDisplay = document.createElement("p");
counterDisplay.innerHTML = `Counter: ${counter}`;
counterDisplay.id = "counterDisplay";
app.append(counterDisplay);

const growthRateDisplay = document.createElement("p");
growthRateDisplay.innerHTML = `Growth Rate: ${growth.toFixed(2)}`;
growthRateDisplay.id = "growthRateDisplay";
app.append(growthRateDisplay);

const clickButtonContainer = document.createElement("div");
clickButtonContainer.className = "center-container";

const clickButton = document.createElement("button");
clickButton.textContent = "Peddle 🚴";
clickButton.className = "circular-button";
clickButton.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `Miles: ${counter}`;
});

clickButtonContainer.appendChild(clickButton);
app.appendChild(clickButtonContainer);

const buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
app.appendChild(buttonContainer);

function createItemButtons(items: Item[]) {
  items.forEach((item) => {
    const purchaseCounter = purchaseCounters[item.name];
    purchaseCounter.style.display = "block";
    purchaseCounter.style.marginTop = "5px";
    purchaseCounter.innerHTML = `Purchased: ${purchaseCount[item.name]}`;

    const button = document.createElement("button");
    button.textContent = `Buy ${item.name} for ${item.cost.toFixed(2)}`;
    button.className = "button";
    button.style.margin = "10px";
    button.addEventListener("click", () => {
      if (counter >= item.cost) {
        counter -= item.cost;
        growth += item.rate;
        purchaseCount[item.name] += 1;
        purchaseCounters[item.name].innerHTML =
          `Purchased: ${purchaseCount[item.name]}`;
        item.cost = Math.round(item.cost * 1.15 * 100) / 100;
        button.textContent = `Buy ${item.name} for ${item.cost.toFixed(2)}`;
        counterDisplay.innerHTML = `Counter: ${counter.toFixed(2)}`;
        growthRateDisplay.innerHTML = `Growth Rate: ${growth.toFixed(2)}`;
      }
    });
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(purchaseCounter);

    updateButtonState(button, item);
  });
}

createItemButtons(availableItems);
let lastTime = 0;
let fps = 60;
let increment = 0;

function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  fps = 1000 / deltaTime;
  increment = growth / fps;
  counter += increment;
  counterDisplay.innerHTML = `Miles: ${counter.toFixed(2)}`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growth.toFixed(2)}`;
  updateAllButtonStates();
  lastTime = currentTime;

  requestAnimationFrame(updateCounter);
}

function updateAllButtonStates() {
  availableItems.forEach((item, index) => {
    const button = buttonContainer.children[index * 2] as HTMLButtonElement;
    updateButtonState(button, item);
  });
}

function updateButtonState(button: HTMLButtonElement, item: Item) {
  button.disabled = counter < item.cost;
}

requestAnimationFrame(updateCounter);
