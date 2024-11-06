import { app, BrowserWindow, ipcMain, dialog } from 'electron/main';
import path from 'node:path';
import fs from 'fs';
import { fileTypeFromFile } from 'file-type';
import { fileURLToPath } from 'url';
import { Base64 } from 'js-base64';
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

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

  win.loadURL('http://localhost:3000/')
  // win.loadFile('index.html')
  win.webContents.openDevTools() 
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

ipcMain.on('select-folder', async (event) => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (!result.canceled) {
    event.reply('selected-folder', result.filePaths[0])
  }
})

ipcMain.on('get-file-tree', async (event, dirPath) => {
  try {
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const files = await Promise.all(items.map(async item => {
      const fullPath = path.join(dirPath, item.name);
      const extension = item.name.substring(item.name.lastIndexOf('.'));
      let fileType = null;
      if (!item.isDirectory()) {
        try {
          fileType = await fileTypeFromFile(fullPath);
        } catch (error) {
          console.error('Error getting file type:', error);
        }
      }
      return {
        name: item.name,
        type: item.isDirectory() ? 'directory' : 'file',
        filetype: fileType?.mime || null,
        path: fullPath,
        extension: extension
      };
    }));
    event.reply('file-tree', files);
  } catch (error) {
    console.error('Error reading directory:', error);
    event.reply('file-tree', []);
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const buffer = await fs.promises.readFile(filePath);
    const base64 = Base64.encode(buffer);
    return base64
  } catch (error) {
    console.error('Error reading the file:', error);
    throw new Error('Failed to read the file');
  }
});
