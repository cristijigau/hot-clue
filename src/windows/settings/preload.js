const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.send("dialog:openFile"),
  useDefault: () => ipcRenderer.send("use-default-data"),
});
