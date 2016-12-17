const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.

  const subex = require('child_process').spawn('~/apps/stack/server/rel/mychat/bin/mychat', ['start'])

  var rq = require('request-promise')
  var mainAddr = 'http://localhost:4000'

  var startUp = function(){
    rq(mainAddr)
      .then(function(htmlString){
        console.log('server started!')
        // TODO: get elixir to start more smoothly
        const subex = require('child_process').spawn('~/apps/stack/server/rel/mychat/bin/mychat', ['restart'])

        mainWindow = new BrowserWindow({width: 800, height: 600, frame: false})
        mainWindow.loadURL(`http://localhost:3000/`)
        mainWindow.on('closed', function () {
          // put an array if your app supports multi windows
          mainWindow = null
        })

      })
      .catch(function(err){
        console.log('waiting for the server start...')
        startUp()
      })
  }

  // fire!
  startUp()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
