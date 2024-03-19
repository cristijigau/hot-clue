import "./index.css";

const selectFileButton = document.getElementById("select-file-button");
const useDefaultButton = document.getElementById("use-default-button");

selectFileButton.addEventListener("click", async () => {
  electronAPI.openFile();
});

useDefaultButton.addEventListener("click", async () => {
  electronAPI.useDefault();
});
