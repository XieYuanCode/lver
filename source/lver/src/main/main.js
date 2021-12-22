const { app, BrowserWindow } = require("electron")
const Store = require("electron-store")

Store.initRenderer()

function creatWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: process.platform === "win32",
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    vibrancy: 'light',
    visualEffectState: "active",
    transparent: true,
    resizable: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })

  win.loadURL("http://localhost:3000/")

  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  app.setAsDefaultProtocolClient('lver', process.execPath, [`${__dirname}`])
  creatWindow()
})