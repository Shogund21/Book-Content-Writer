const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const Store = require('electron-store');

const store = new Store();
let ai;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // Create the Application's main menu
  const template = [
    {
      label: "Edit",
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectAll' }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

ipcMain.on('show-context-menu', (event) => {
  const template = [
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});

app.whenReady().then(async () => {
  ai = require('./ai.js');
  createWindow();
}).catch(error => {
  console.error('Initialization Error:', error);
  dialog.showErrorBox('Initialization Error', 'Failed to initialize the application. Please check the logs and try again.');
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('get-api-key', () => {
  return store.get('openai-api-key');
});

ipcMain.handle('set-api-key', (event, key) => {
  store.set('openai-api-key', key);
  return true;
});

async function handleAIRequest(requestFunc, ...args) {
  let apiKey = store.get('openai-api-key');
  if (!apiKey) {
    throw new Error('Valid API key not set. Please enter a valid OpenAI API key.');
  }
  try {
    return await requestFunc(...args, apiKey);
  } catch (error) {
    console.error('AI Request Error:', error.message);
    if (error.message.includes('Incorrect API key provided') || error.message.includes('Invalid API key')) {
      store.delete('openai-api-key');
      throw new Error('Invalid API key. Please enter a new one.');
    } else if (error.message.includes('API rate limit exceeded')) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
}

ipcMain.handle('generate-suggestions', async (event, text) => {
  return handleAIRequest(ai.generateSuggestions, text);
});

ipcMain.handle('expand-content', async (event, text) => {
  return handleAIRequest(ai.expandContent, text);
});

ipcMain.handle('write-from-prompt', async (event, prompt) => {
  return handleAIRequest(ai.writeFromPrompt, prompt);
});

ipcMain.handle('expand-ai-content', async (event, content) => {
  return handleAIRequest(ai.expandAiContent, content);
});

ipcMain.handle('save-file', async (event, content) => {
  try {
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save Manuscript',
      defaultPath: path.join(app.getPath('documents'), 'manuscript.txt')
    });

    if (filePath) {
      await fs.writeFile(filePath, content, 'utf8');
      return 'File saved successfully';
    }
    return 'Save cancelled';
  } catch (error) {
    console.error('Save File Error:', error);
    throw new Error('Failed to save file. Please try again.');
  }
});