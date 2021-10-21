const { app, BrowserWindow } = require("electron")

function creatWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    titleBarStyle: "hidden",
    vibrancy: 'light',
    visualEffectState: "active",
    transparent: true,
    webPreferences: {
      devTools: true
    }
  })

  win.loadURL("http://localhost:3000/")

  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  creatWindow()
})