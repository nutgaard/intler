const electron = require('electron');
const shortcuts = require('electron-localshortcut');
const { app } = electron;
const { BrowserWindow } = electron;

let win;


function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    const ipcSend = (handler) => win.webContents.send('hotkey', handler.toString());
    shortcuts.register('Ctrl+E', () => {
        console.log('CTRL+E');
        ipcSend((store) => store.toggleInteractive());
    });
}


app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
