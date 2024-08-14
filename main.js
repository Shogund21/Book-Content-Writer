const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs').promises
const { generateSuggestions, expandContent, writeFromPrompt } = require('./ai.js')

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
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

ipcMain.handle('expand-content', async (event, text) => {
  return await expandContent(text);
})

ipcMain.handle('write-from-prompt', async (event, prompt) => {
  return await writeFromPrompt(prompt);
})

ipcMain.handle('save-file', async (event, content) => {
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save Manuscript',
    defaultPath: path.join(app.getPath('documents'), 'manuscript.txt')
  });

  if (filePath) {
    await fs.writeFile(filePath, content, 'utf8');
    return 'File saved successfully';
  }
  return 'Save cancelled';
});