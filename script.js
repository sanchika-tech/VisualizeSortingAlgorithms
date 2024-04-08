"use strict";
const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
};

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;

    const valueLabel = document.createElement("span");
    valueLabel.className = "value-label";
    valueLabel.textContent = element;
    node.appendChild(valueLabel);

    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};
// Add event listener to the theme toggle button
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Function to toggle between light and dark themes
function toggleTheme() {
  // Toggle the 'dark' class on the body element
  document.body.classList.toggle("dark");
  // Store the user's preference in localStorage
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Function to set the initial theme based on user's preference stored in localStorage
function setInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }
}
function updateStatistics(comparisonsCount, swapsCount, timeElapsed) {
  document.getElementById('comparisons').textContent = `Comparisons: ${comparisonsCount}`;
  document.getElementById('swaps').textContent = `Swaps: ${swapsCount}`;
  document.getElementById('time').textContent = `Time: ${timeElapsed.toFixed(2)} seconds`;
}
// Call the setInitialTheme function when the page loads
document.addEventListener("DOMContentLoaded", setInitialTheme);

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;




  



