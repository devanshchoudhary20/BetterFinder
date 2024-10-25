const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  readDirectory: (dirPath) => ipcRenderer.invoke('read-directory', dirPath)
})
