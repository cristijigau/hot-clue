const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("node:fs");

const closeSettingsWindow = () => {
  const [_overlayWindow, settingsWindow] = BrowserWindow.getAllWindows();
  settingsWindow.close();
};

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(undefined, {
    filters: [{ name: "JSON", extensions: ["json"] }],
  });

  if (!canceled) {
    fs.readFile(filePaths[0], (err, data) => {
      if (!err) {
        const fileData = JSON.parse(data);

        const overlayWindow = createOverlayWindow();

        overlayWindow.addListener("ready-to-show", () => {
          overlayWindow.webContents.send("clues-data-loaded", fileData);
          closeSettingsWindow();
        });
      }
    });
  }
};

const handleDefault = () => {
  const overlayWindow = createOverlayWindow();

  overlayWindow.addListener("ready-to-show", () => {
    overlayWindow.webContents.send("clues-data-loaded", null);
    closeSettingsWindow();
  });
};

const addCommunicationListeners = () => {
  ipcMain.on("dialog:openFile", handleFileOpen);
  ipcMain.on("use-default-data", handleDefault);
};

const createOverlayWindow = () => {
  const win = new BrowserWindow({
    fullscreen: true,
    resizable: false,
    movable: false,
    minimizable: false,
    closable: false,
    focusable: false,
    alwaysOnTop: true,
    frame: false,
    autoHideMenuBar: true,
    hasShadow: false,
    transparent: true,
    webPreferences: {
      preload: OVERLAY_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  win.setSkipTaskbar(false);
  win.setIgnoreMouseEvents(true);
  win.loadURL(OVERLAY_WINDOW_WEBPACK_ENTRY);

  return win;
};

const createSettingsWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      preload: SETTINGS_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  win.loadURL(SETTINGS_WINDOW_WEBPACK_ENTRY);
};

if (require("electron-squirrel-startup") === true) app.quit();

app.whenReady().then(() => {
  createSettingsWindow();
  addCommunicationListeners();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createSettingsWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
