const { contextBridge } = require("electron");
const { isMac, isWindows, isLinux } = require("./helpers/detect-platform");

contextBridge.exposeInMainWorld("electronAPI", {
  isMac,
  isWindows,
  isLinux,
});
