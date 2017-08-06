const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Global Variables
global.sharedObj = { view: 'view/editor.html', register: new Array(1000) }

global.sharedObj.register[0] = 0
console.log(global.sharedObj.register[0])

function chooseWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 720,
    height: 170,
    frame: false,
    resizable: false
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'view/choose.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

exports.createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 840,
    height: 600,
    frame: false,
    resizable: true
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, global.sharedObj.view),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  globalShortcut.register('F1', () => {
    global.sharedObj.view = 'view/editor.html'
  })
  globalShortcut.register('F2', () => {
    global.sharedObj.view = 'view/asm.html'
  })
  globalShortcut.register('F3', () => {
    global.sharedObj.view = 'view/menu.html'
  })
  chooseWindow()
})

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
  if (win === null) {
    chooseWindow()
  }
})
