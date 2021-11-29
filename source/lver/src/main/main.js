const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron")
const Store = require("electron-store")

const store = new Store()

ipcMain.on("setting_confirmed", (e, args) => { 
  store.set("setting", args)
})

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
  console.log(123, nativeTheme.themeSource)
  creatWindow()
})