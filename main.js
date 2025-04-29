const { app, BrowserWindow } = require('electron');
const path = require('path');

console.log('Electron app is starting...');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webgl: true
        }
    });

    mainWindow.loadFile('index.html');
    
    // 开发时不要全屏，方便调试
    // mainWindow.setFullScreen(true);
    
    // 打开开发者工具
    mainWindow.webContents.openDevTools();

    // 添加错误监听
    mainWindow.webContents.on('crashed', (event) => {
        console.error('Window crashed:', event);
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load:', errorCode, errorDescription);
    });
}

app.whenReady().then(() => {
    console.log('Electron is ready!');
    createWindow();
}).catch(err => {
    console.error('Error during app initialization:', err);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});