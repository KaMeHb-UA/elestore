const {app, BrowserWindow} = require('electron'),
		path = require('path'),
		url = require('url'),
        mkdirp = require('mkdirp'),
        fs = require('fs'),
        pkg = require(path.join(__dirname, 'package.json')),
        child_process = require('child_process')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({width: 800, height: 600})

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	// Open the DevTools.
	win.webContents.openDevTools()

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
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

var sourceInterfaces = [], depsUpdated = false;

fs.readdir(path.join(__dirname, 'plugins/sources'), (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (file != '.' && file != '..' && file != 'source-sample.js') sourceInterfaces.push(require(path.join(__dirname, 'plugins/sources', file)))
    })
});

sourceInterfaces.forEach(Interface => {
    if (pkg.dependencies){
        for(let i in Interface._properties.dependencies){
            if (!pkg.dependencies[i]) {
                depsUpdated = true;
                pkg.dependencies[i] = Interface._properties.dependencies[i];
            } else if (Interface._properties.dependencies[i] != pkg.dependencies[i]) throw ReferenceError(`Cannot use system dependence's another version. [${i}: ${Interface._properties.dependencies[i]} != ${pkg.dependencies[i]}]`)
        }
    } else {
        depsUpdated = true;
        pkg.dependencies = Interface._properties.dependencies
    }
});
if (depsUpdated) fs.writeFile(path.join(__dirname, 'package.json'), JSON.stringify(pkg), 'utf8', err => {
    if (err) return console.log(err); else {
        //installing new dependencies
        let installer = child_process.spawn('npm', ['install'], {
            cwd: __dirname
        });
        installer.on('close', code => {
            if (!code){
                child_process.spawn('npm', ['start'], {
                    cwd: __dirname,
                    detached: true
                });
                process.exit()
            } else console.error('Cannot install deps');
        })
    }
});