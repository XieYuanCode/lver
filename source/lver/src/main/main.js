const { app, BrowserWindow } = require("electron")

function creatWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080
  })

  win.loadURL("http://localhost:3000/")
}

app.whenReady().then(() => {
  creatWindow()
})