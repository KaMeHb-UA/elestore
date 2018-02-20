const {app, BrowserWindow} = require('electron'),
    path = require('path'),
    url = require('url'),
    mkdirp = require('mkdirp'),
    deasync = require('deasync'),
    mkdirpSync = deasync(mkdirp),
    sleep = deasync((timeout, done)=>{setTimeout(done, timeout)}),
    fs = require('fs'),
    copydir = require('copy-dir'),
    pkg = require(path.join(__dirname, 'package.json')),
    child_process = require('child_process'),
    __appdir = path.resolve(require('homedir')(), '.config/elestore/3rd-party');

try{
    var settings = require(path.join(__appdir, 'settings.json'));
} catch(e){
    mkdirpSync(__appdir);
    copydir.sync(path.join(__dirname, '3rd-party'), __appdir);
    child_process.spawn(path.resolve(__dirname, '../../elestore'), [], {
        detached: true
    });
    process.exit()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function loadPage(name){
    return win.loadURL(url.format({
		pathname: path.join(__appdir, 'themes', settings.theme, `${name}.html`),
		protocol: 'file:',
		slashes: true
	}), {
        API: require(path.join(__dirname, 'plugins/api.js'))
    })
}

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 500
    })

	// and load the startup page of the app.
    loadPage('startup');

	// Open the DevTools.
	win.webContents.openDevTools()

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
    });

    win.setMenu(null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var pluginsPath = path.join(__appdir, 'plugins/sources');

fs.readdir(pluginsPath, (err, files) => {
    if (err) return console.log(err);
    var sourceInterfaces = [];
    files.forEach(file => {
        if (file != '.' && file != '..' && file != 'source-sample.js' && file != 'source-sample') sourceInterfaces.push(require(path.join(pluginsPath, file)));
    });
    global.API = new (require(path.join(__dirname, 'plugins/api.js')))(sourceInterfaces);
    drawInterface();
});
function drawInterface(){
    try{
        loadPage('main')
    } catch(e){
        setTimeout(drawInterface, 100)
    }
}
