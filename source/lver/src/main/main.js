const { app, BrowserWindow, TouchBar, Tray, Menu, ipcMain, dialog, globalShortcut } = require("electron")
const Store = require("electron-store")
const path = require('path')
const fs = require('fs')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar
const store = new Store();
Store.initRenderer()

var tray = null
let win = null

const trayContextMenu = Menu.buildFromTemplate([])

const defaultShortcuts = [
  {
    action: 'switch_opend_tab',
    isEditing: false,
    key: {
      functionalKeys: ['CommandOrControl'],
      key: ["1-9"]
    },
  },
  {
    action: 'settings',
    key: {
      functionalKeys: ['CommandOrControl'],
      key: [',']
    },
    isEditing: false,
  },
  {
    action: 'import_local_log',
    key: {
      functionalKeys: ['CommandOrControl', 'Shift'],
      key: ['I']
    },
    isEditing: false,
  },
  {
    action: 'import_shared_log',
    key: {
      functionalKeys: ['CommandOrControl', 'Shift'],
      key: ['S']
    },
    isEditing: false,
  },
  {
    action: 'setting_general',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_shortcut',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_account',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_about',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_log',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_theme',
    isEditing: false,
    key: null,
  },
  {
    action: 'setting_update',
    isEditing: false,
    key: null,
  },
  {
    action: 'search_log_file',
    isEditing: false,
    key: null,
  },
  {
    action: 'search_log_rule',
    isEditing: false,
    key: null,
  },
  {
    action: 'search_log_field',
    isEditing: false,
    key: null,
  },
  {
    action: 'share_log',
    isEditing: false,
    key: null,
  }
]

const shortcutList = store.get('shortcutList', defaultShortcuts)

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
ipcMain.on('delete-file', (e, arg) => {
  fs.rmSync(arg)
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
  shortcutList.forEach(shortcut => {
    if (shortcut.key !== null) {
      if (shortcut.action === 'switch_opend_tab') {
        console.log(shortcut);
        for (let index = 1; index < 10; index++) {
          const accelerator = shortcut.key.functionalKeys.join('+') + '+' + index
          globalShortcut.register(accelerator, () => {
            win && win.webContents.send('switch_opend_tab', index)
          })
        }
      } else {
        const accelerator = shortcut.key.functionalKeys.join('+') + '+' + shortcut.key.key.join('+')
        globalShortcut.register(accelerator, () => {
          win && win.webContents.send(shortcut.action)
        })
      }
    }
  })
  tray = new Tray(path.join(__dirname, '..', 'build', 'icons', 'tary.png'))
  tray.setContextMenu(trayContextMenu)
  app.setAsDefaultProtocolClient('lver', process.execPath, [`${__dirname}`])
  creatWindow()
  win.setTouchBar(touchBar)
})