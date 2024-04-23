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
function textFun(){
  var selectedValue = this.value;
  if (selectedValue === "0") {
    document.querySelector(".description").innerHTML = "";
  } else if (selectedValue === "1") {
    document.querySelector(".description").innerHTML = "<h3>How Bubble Sort works</h3><br> <p>Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order. This procedure is repeated until no swaps are required, indicating that the list has been sorted.</p> <br> <h3>Performance</h3><br> <p>Assuming N is the size of array,</p> <p>Worst time complexity<pre>O(N<sup>2</sup>)</pre></p> <p>Average time complexity<pre>θ(N<sup>2</sup>)</pre></p> <p>Best time complexity<pre>Ω(N)</pre></p> <p><br> <a href='https://www.geeksforgeeks.org/bubble-sort/'>Click for more information </a></p>";
    document.querySelector(".description").style.backgroundColor = '#f48434';
  } else if (selectedValue === "2") {
    document.querySelector(".description").innerHTML = "<h3>How Selection Sort works</h3><br><p>Selection Sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays, a subarray which is sorted and the remaining array which is unsorted.</p><br> <h3>Performance</h3><br> <p>Assuming N is the size of array,</p> <p>Worst time complexity <pre> O(N<sup>2</sup>)</pre></p> <p>Average time complexity <pre> θ(N<sup>2</sup>)</pre></p> <p>Best time complexity<pre>Ω(N<sup>2</sup>)</pre></p> <p><br> <a href='https://www.geeksforgeeks.org/selection-sort/'>Click for more information </a></p>";
    document.querySelector(".description").style.backgroundColor = '#f48434';
  }
  else if (selectedValue === "3") {
    document.querySelector(".description").innerHTML = "<h3>How Insertion Sort works</h3><br><p>Insertion Sort is a simple sorting algorithm that builds the final sorted list one item at a time. The list is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.</p><br> <h3>Performance</h3><br> <p>Assuming N is the size of array,</p> <p>Worst time complexity <pre>O(N<sup>2</sup>)</pre></p> <p>Average time complexity <pre>θ(N<sup>2</sup>)</pre></p> <p>Best time complexity <pre>Ω(N)</pre></p> <p> <br><a href='https://www.geeksforgeeks.org/insertion-sort/'>Click for more information </a></p>";
    document.querySelector(".description").style.backgroundColor = '#f48434';
  }
  else if (selectedValue === "4") {
    document.querySelector(".description").innerHTML = "<h3>How Merge Sort works</h3><br><p>Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is a key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted subarrays into one.</p><br> <h3>Performance</h3><br> <p>Assuming N is the size of array,</p> <p>Worst time complexity <pre>O(NlogN)</pre></p> <p>Average time complexity <pre>θ(NlogN)</pre></p> <p>Best time complexity  <pre>Ω(NlogN)</pre></p> <p><br> <a href='https://www.geeksforgeeks.org/merge-sort/'>Click for more information </a></p>";
    document.querySelector(".description").style.backgroundColor = '#f48434';
  }
  else if (selectedValue === "5") {
    document.querySelector(".description").innerHTML = "<h3>How Quick Sort works</h3><br><p>Quick Sort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of Quick Sort that pick pivot in different ways.</p> <br><h3>Performance</h3><br> <p>Assuming N is the size of array,</p> <p>Worst time complexity <pre>O(N<sup>2</sup>)</pre></p> <p>Average time complexity <pre>θ(NlogN)</pre></p> <p>Best time complexity <pre>Ω(N)</pre></p> <p><br> <a href='https://www.geeksforgeeks.org/quick-sort/'>Click for more information </a></p>";
    document.querySelector(".description").style.backgroundColor = '#f48434';
  }

}
document.getElementById("menu").addEventListener("change", textFun);
