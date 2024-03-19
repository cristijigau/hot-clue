import "./index.css";
import macOSJson from "../../../assets/macOS.json";
import windowsJson from "../../../assets/windows.json";

const { isMac, onCluesDataLoaded } = window.electronAPI;
let defaultCluesJson;

if (isMac) {
  defaultCluesJson = macOSJson;
} else {
  defaultCluesJson = windowsJson;
}

const createClue = (clue, parent) => {
  const clueElement = document.createElement("span");
  clueElement.innerText = clue;
  parent.appendChild(clueElement);
};

const renderClues = (clues) => {
  const parsedClues = Object.entries(clues).map(
    (clueData) => clueData[0] + " : " + clueData[1]
  );
  const clueSection = document.getElementById("clue-section");

  parsedClues.forEach((clue) => createClue(clue, clueSection));
};

onCluesDataLoaded((loadedData) => {
  if (loadedData) {
    renderClues(loadedData);
  } else {
    renderClues(defaultCluesJson);
  }
});
