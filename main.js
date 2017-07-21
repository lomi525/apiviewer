// ./main.js
const { app, BrowserWindow, net, protocol } = require('electron');
const path = require('path');
const url = require('url');
const remoteRequest = require('./remote.request');
require('./remote.menu');

require('dotenv').config();


let win = null;
app.on('ready', function () {
  protocol.registerStandardSchemes(['atom'])
  app.on('ready', () => {
    protocol.registerHttpProtocol('atom', '...')
  })
  remoteRequest();

  // Initialize the window to our specified dimensions
  //webPreferences > webSecurity:false  CORS 무시
  win = new BrowserWindow({ width: 1000, height: 600, webPreferences: { webSecurity: false } });

  console.log(__dirname);
  // Specify entry point
  if (process.env.PACKAGE === 'true') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }
  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});