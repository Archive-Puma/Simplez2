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
  main.view = 'view/editor.html'
  main.createWindow()
  window.close()
}, false)
