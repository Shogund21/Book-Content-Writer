require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { generateSuggestions } = require('./ai.js')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('generate-suggestions', async (event, text) => {
  return await generateSuggestions(text);
})