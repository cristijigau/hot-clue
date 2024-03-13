const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    fullscreen: true,
    resizable: false,
    movable: false,
    minimizable: false,
    closable: false,
    focusable: false,
    skipTaskbar: false,
    alwaysOnTop: true,
    frame: false,
    autoHideMenuBar: true,
    hasShadow: false,
    transparent: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  win.setIgnoreMouseEvents(true);

  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
