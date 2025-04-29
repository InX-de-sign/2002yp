const { app, BrowserWindow } = require('electron');
const path = require('path');
const modelPath = path.join(__dirname, 'models', 'sampleModel1.glb');

console.log('Electron app is starting...');
console.log('App path:', app.getAppPath());
console.log('Current dir:', __dirname);

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
    mainWindow.setFullScreen(true);
    mainWindow.webContents.openDevTools();
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