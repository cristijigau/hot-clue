const { contextBridge, ipcRenderer } = require("electron");
const { isMac, isWindows, isLinux } = require("../../helpers/detect-platform");

contextBridge.exposeInMainWorld("electronAPI", {
  isMac,
  isWindows,
  isLinux,
  onCluesDataLoaded: (callback) =>
    ipcRenderer.on("clues-data-loaded", (_event, value) => callback(value)),
});
