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
    __appdir = path.resolve(require('homedir')(), '.config/elestore/3rd-party'),
    npm = require('npm');

function npm_install(dir, logger){
    return new Promise(function(resolve, reject){
        var previous = process.cwd();
        process.chdir(dir);
        npm.load({
            'bin-links': false,
            verbose: true,
            prefix: dir
        }, (err) => {
            // handle errors
            if(err) {
                return reject(err);
            }
            // install modules
            npm.commands.install([], (err, data) => {
                process.chdir(previous);
                if(err) {
                    reject(err);
                }
                // log errors or data
                resolve(data);
            });
            npm.on('log', (message) => {
                // log installation progress
                logger(message);
            });
        });
    })
}

try{
    var settings = require(path.join(__appdir, 'settings.json'));
} catch(e){
    mkdirpSync(__appdir);
    copydir.sync(path.join(__dirname, '3rd-party'), __appdir);
    child_process.spawn(process.argv[0], [], {
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

function waitForWebContents(callback){
    if(!win || !win.webContents) setTimeout(()=>{waitForWebContents(callback)}, 100); else callback();
}

function execJS(text){
    waitForWebContents(()=>{win.webContents.executeJavaScript(text)})
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var pluginsPath = path.join(__appdir, 'plugins/sources');

fs.readdir(pluginsPath, (err, files) => {
    if (err) return console.log(err);
    var sourceInterfaces = [], toInstall = [], depsUpdated = false, internalErr = false;
    files.forEach(file => {
        if (file != '.' && file != '..' && file != 'source-sample'){
            if(!fs.existsSync(path.join(pluginsPath, file, 'node_modules'))){
                depsUpdated = true;
                toInstall.push(path.join(pluginsPath, file));
            } else if (!toInstall.length) sourceInterfaces.push(require(path.join(pluginsPath, file)));
        }
    });
    if (toInstall.length){
        execJS('setLoadingStage("Installing new dependencies")');
        execJS(`internalConsole.log('Executed npm install')`);
        execJS(`internalConsole.warn('Note: may not work in production')`);
        (function a(dir){
            if (dir) npm_install(dir, message => {
                execJS(`internalConsole.log(${JSON.stringify(message)})`);
            }).then(message => {
                execJS(`internalConsole.log(${JSON.stringify(message)})`);
                a(toInstall.shift())
            }).catch(err => {
                execJS(`internalConsole.err(${JSON.stringify(err.toString())})`);
            }); else {
                let tm = 3000;
                execJS(`internalConsole.log("All done, restart in ${tm/1000} seconds")`)
                setTimeout(() => {
                    child_process.spawn(process.argv[0], [], {
                        detached: true
                    });
                    process.exit()
                }, tm)
            }
        })(toInstall.shift())
    } else {
        global.API = new (require(path.join(__dirname, 'plugins/api.js')))(sourceInterfaces);
        global.devTools = {
            open: () => {
                win.webContents.openDevTools()
            },
            close: () => {
                win.webContents.closeDevTools()
            },
            toggle: () => {
                win.webContents.toggleDevTools()
            },
            isOpened: () => {
                return win.webContents.isDevToolsOpened()
            }
        };
        global.API.loaded = () => {
            return new Promise(resolve => {
                win.webContents.executeJavaScript(global.API.toInit);
                global.API.toInit = undefined;
                win.webContents.executeJavaScript([


                    `(div=>{
                        var devTools;
                        div ? (
                            ${
                                process.argv[1] == '--devmode' ? `devTools = require('electron').remote.getGlobal('devTools'),
                                div.setAttribute('state', 'closed'),
                                div.onclick = () => {
                                    devTools.toggle();
                                    devTools.isOpened() ? div.setAttribute('state', 'opened') : div.setAttribute('state', 'closed');
                                    return false
                                }` : "div.setAttribute('state', 'disabled')"
                            }
                        ) : null
                    })(document.querySelector('[__action="open-dev-tools-button"]'))`,
    
                ].join(';'));
                resolve(global.API)
            })
        }
        drawInterface()
    }
});
function drawInterface(){
    try{
        loadPage('main')
    } catch(e){
        setTimeout(drawInterface, 100)
    }
}
