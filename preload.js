const { contextBridge, ipcRenderer } = require('electron');
const langChainIntegration = require('./langChainIntegration');

contextBridge.exposeInMainWorld('electronAPI', {
  generateSuggestions: (text) => langChainIntegration.generateSuggestions(text),
  generateContent: (prompt) => langChainIntegration.generateContent(prompt),
  checkGrammarAndStyle: (text) => langChainIntegration.checkGrammarAndStyle(text),
  saveFile: (content) => ipcRenderer.invoke('save-file', content),
  openFile: () => ipcRenderer.invoke('open-file'),
  exportPDF: (content) => ipcRenderer.invoke('export-pdf', content),
  exportDOCX: (content) => ipcRenderer.invoke('export-docx', content)
});