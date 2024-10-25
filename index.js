const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')
const fs = require('fs')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools() // Open DevTools for debugging
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('open-folder-dialog', async () => {
  console.log('Open folder dialog requested');
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  console.log('Dialog result:', result);
  if (!result.canceled) {
    return result.filePaths[0]
  }
  return null
})

ipcMain.handle('read-directory', async (event, dirPath) => {
  console.log('Read directory requested:', dirPath);
  try {
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true })
    const result = items.map(item => ({
      name: item.name,
      isDirectory: item.isDirectory(),
      path: path.join(dirPath, item.name)
    }))
    console.log('Directory contents:', result);
    return result
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
})
