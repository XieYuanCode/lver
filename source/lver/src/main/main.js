const { app, BrowserWindow, TouchBar, Tray, Menu, ipcMain, dialog } = require("electron")
const Store = require("electron-store")
const path = require('path')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar
const store = new Store();
Store.initRenderer()

var tray = null
let win = null

const trayContextMenu = Menu.buildFromTemplate([])

function creatWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: 'lver',
    resizable: true,
    movable: true,
    icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
    frame: process.platform === "win32",
    titleBarStyle: process.platform === "win32" ? "default" : "hidden",
    vibrancy: 'light',
    visualEffectState: "active",
    transparent: true,
    resizable: true,
    opacity: store.get('windowOpacity' || 0.9),
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


const touchBar = new TouchBar({
  items: [
    new TouchBarSpacer({ size: 'large' }),
    new TouchBarLabel({
      label: "touchBar will comming soon",
      textColor: '#fff',
      backgroundColor: '#000'
    }),
  ]
})

// 透明度改变
ipcMain.on('opacity-changed', (e, arg) => { win && win.setOpacity(arg) })
// 登录启动改变
ipcMain.on('openOnLogin-changed', (e, arg) => {
  app.setLoginItemSettings({
    openAtLogin: arg
  })
})
// 打开目录选择
ipcMain.on('open-log-folder-dialog', (e, arg) => {
  const folder = dialog.showOpenDialogSync({
    title: arg.title,
    properties: ['openDirectory']
  })

  console.log('folder', folder);
  e.returnValue = folder
})

app.setAboutPanelOptions({
  applicationName: 'lver',
  applicationVersion: "1.0.0",
  version: "1.0.0",
  authors: "Creaster",
  website: '81.70.22.185',
  iconPath: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
})

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, '..', 'build', 'icons', 'tary.png'))
  tray.setContextMenu(trayContextMenu)
  app.setAsDefaultProtocolClient('lver', process.execPath, [`${__dirname}`])
  creatWindow()
  win.setTouchBar(touchBar)
})