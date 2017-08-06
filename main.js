const {app, BrowserWindow, remote, globalShortcut} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let winChoose
let winApp

// Global Variables
global.sharedObj = { view: 'view/editor.html', register: [] }

// Clear the memory
for (var i = 0; i < 512; i++) {
  global.sharedObj.register[i] = 0
}

function chooseWindow () {
  // Create the browser window.
  winChoose = new BrowserWindow({
    width: 720,
    height: 170,
    frame: false,
    resizable: false
  })

  // and load the index.html of the app.
  winChoose.loadURL(url.format({
    pathname: path.join(__dirname, 'view/choose.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // winChoose.webContents.openDevTools()

  // Emitted when the window is closed.
  winChoose.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    winChoose = null
  })
}

function createWindow () {
  // Create the browser window.
  winApp = new BrowserWindow({
    width: 840,
    height: 600,
    frame: false,
    resizable: true
  })

  // and load the index.html of the app.
  winApp.loadURL(url.format({
    pathname: path.join(__dirname, global.sharedObj.view),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  winApp.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    winApp = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  globalShortcut.register('F1', () => {
    console.log('Cambia a EDITOR!')
  })
  globalShortcut.register('F2', () => {
    console.log('Cambia a ENSAMBLADOR!')
  })
  globalShortcut.register('F3', () => {
    console.log('Cambia a MENU!')
  })
  chooseWindow()
})

exports.createWindow = createWindow

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (winChoose === null && winApp == null) {
    chooseWindow()
  }
})
