// Electron Remote Constants
const {remote} = require('electron')
const main = remote.require('./main.js')

/** WINDOW BUTTONS >>
======================= */
document.getElementById('close-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  window.close()
}, false)

document.getElementById('min-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  window.minimize()
}, false)

document.getElementById('editor-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  remote.getGlobal('sharedObj').view = 'view/editor.html'
  main.createWindow()
  window.close()
}, false)

document.getElementById('asm-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  remote.getGlobal('sharedObj').view = 'view/asm.html'
  main.createWindow()
  window.close()
}, false)

document.getElementById('menu-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  remote.getGlobal('sharedObj').view = 'view/menu.html'
  main.createWindow()
  window.close()
}, false)
