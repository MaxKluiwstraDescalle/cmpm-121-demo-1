import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let counter: number = 0;
let growth: number = 0;
const baseGrowthRate = 1.15
const baseCost = 10;

function updateButtonState(button: HTMLButtonElement, item: autoClickerButton) {
  button.disabled = counter < item.cost;
}

function updateAllButtonStates() {
  availableItems.forEach((item, index) => {
    const button = buttonContainer.children[index * 2] as HTMLButtonElement;
    updateButtonState(button, item);
  });
}

function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  fps = 1000 / deltaTime;
  increment = growth / fps;
  counter += increment;
  milesCounter.innerHTML = `Miles: ${counter.toFixed(2)}`;
  automatedPedaling.innerHTML = `Growth Rate: ${growth.toFixed(2)}`;
  updateAllButtonStates();
  lastTime = currentTime;

  requestAnimationFrame(updateCounter);
}

function createItemButtons(items: autoClickerButton[]) {
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
        item.cost = Math.round(item.cost * baseGrowthRate * 100) / 100;
        button.textContent = `Buy ${item.name} for ${item.cost.toFixed(2)}`;
        milesCounter.innerHTML = `Counter: ${counter.toFixed(2)}`;
        automatedPedaling.innerHTML = `Growth Rate: ${growth.toFixed(2)}`;
      }
    });
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(purchaseCounter);

    updateButtonState(button, item);
  });
}

interface autoClickerButton {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: autoClickerButton[] = [
  { name: "Teammate", cost: 1*baseCost, rate: 0.1 },
  { name: "Coach", cost: 10*baseCost, rate: 2 },
  { name: "Team", cost: 100*baseCost, rate: 50 },
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

const gameHeader = document.createElement("h1");
gameHeader.innerHTML = gameName;
app.append(gameHeader);

const milesCounter = document.createElement("p");
milesCounter.innerHTML = `Counter: ${counter}`;
milesCounter.id = "counterDisplay";
app.append(milesCounter);

const automatedPedaling = document.createElement("p");
automatedPedaling.innerHTML = `Growth Rate: ${growth.toFixed(2)}`;
automatedPedaling.id = "growthRateDisplay";
app.append(automatedPedaling);

const clickButtonContainer = document.createElement("div");
clickButtonContainer.className = "center-container";

const manualPedalButton = document.createElement("button");
manualPedalButton.textContent = "Peddle 🚴";
manualPedalButton.className = "circular-button";
manualPedalButton.addEventListener("click", () => {
  counter += 1;
  milesCounter.innerHTML = `Miles: ${counter}`;
});

clickButtonContainer.appendChild(manualPedalButton);
app.appendChild(clickButtonContainer);

const buttonContainer = document.createElement("div");
buttonContainer.id = "buttonContainer";
app.appendChild(buttonContainer);



createItemButtons(availableItems);
let lastTime = 0;
let fps = 60;
let increment = 0;


requestAnimationFrame(updateCounter);
