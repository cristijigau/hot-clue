import "./index.css";
import macOSJson from "../assets/macOS.json";
import windowsJson from "../assets/windows.json";

const { isMac } = window.electronAPI;
let cluesJson;

if (isMac) {
  cluesJson = macOSJson;
} else {
  cluesJson = windowsJson;
}

const createClue = (clue, parent) => {
  const clueElement = document.createElement("span");
  clueElement.innerText = clue;
  parent.appendChild(clueElement);
};

const clues = Object.entries(cluesJson).map(
  (clueData) => clueData[0] + " : " + clueData[1]
);
const clueSection = document.getElementById("clue-section");

clues.forEach((clue) => createClue(clue, clueSection));
