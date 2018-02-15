var sources = [];
function setUpPromise(asyncFunction, thisArg){
    return function(){
        var args = arguments;
        args.push = val => {
            args[args.length++] = val;
        }
        return new Promise(function(resolve, reject){
            asyncFunction.apply(thisArg, (args.push(function(){
                var err = arguments[0], i, neededArgs = [];
                for(i = 1; i < arguments.length; i++){
                    neededArgs.push(arguments[i])
                }
                if(!err) resolve.apply(thisArg, neededArgs); else reject.apply(thisArg, err)
            }), args))
        })
    }
}
function checkApp(app, callback){
    if(!app || !app.getSource){
        callback(new Error('app has no method getSource()'));
        return false;
    } else return true;
}
var cache = {};

module.exports = class{
    constructor(sourceInterfaces){
        cache.sourceIcons = {};
        sourceInterfaces.forEach(source => {
            if (!source._properties.platform || process.platform == source._properties.platform){
                sources.push((a => {
                    cache.sourceIcons[source._properties.name] = source._properties.icon;
                    a.name = source._properties.name;
                    return a
                })(new source()));
            }
        });
        (list => {
            list.forEach(method => {
                var temp = this[method];
                this[method] = function(){
                    if (temp.length == arguments.length) temp.apply(this, arguments); else return setUpPromise(temp, this)(arguments)
                }
            })
        })([
            'getApps',
            'getRating',
            'getImages',
            'getNeededSpace',
            'getReviews',
            'install',
        ])
    }
    /*/-------------------------------------------------------\*\
    |/                                                         \|
    |        Preparation done. Next, describing methods         |
    |\                                                         /|
    \*\-------------------------------------------------------/*/
    getApps(props, callback){
        props = props || {};
        var appsDB = [], done = 0;
        appsDB.sortBy = prop => {
            if(typeof prop != 'string') return new TypeError('prop arg is not of type string');
            var expl = false;
            appsDB.forEach(app => {
                if(!expl){
                    if(typeof app[prop] != 'number') expl = true;
                }
            });
            if(expl) return new TypeError(`app[${JSON.stringify(prop)}] is not of type number`); else {
                let newArr = appsDB.sort((app1, app2) => {
                    return app2[prop] - app1[prop]
                });
                return newArr.sortBy = appsDB.sortBy, newArr;
            }
        };
        sources.forEach((source, index) => {
            source.list((err, apps)=>{
                if(!err){
                    apps.forEach(app => {
                        app.getSource = () => {
                            return {
                                name: source.name,
                                icon: cache.sourceIcons[source.name] // must be replaced to getter's version
                            }
                        };
                        appsDB.push(app)
                    });
                    if (sources.length == ++done) callback(null, appsDB)
                } else callback(err)
            })
        })
    }
    getRating(app, callback){
        if(!app.getSource) app = app[0];
        console.log('APP:');
        console.log(app);
        if(checkApp(app, callback)){
            let sn = app.getSource().name;
            sources.forEach(source => {
                console.log(`${sn} VS ${source.name}`);
                if (source.name == sn){
                    console.log('YES')
                    source.rating(app.name, callback)
                } else console.log('NO')
            });
        } else console.log('checkApp() failed');
    }
    getImages(app, callback){
        if(checkApp(app, callback)){
            let sn = app.getSource().name;
            sources.forEach(source => {
                if (source.name == sn) source.images(app.name, callback)
            });
        }
    }
    getNeededSpace(app, callback){
        if(checkApp(app, callback)){
            let sn = app.getSource().name;
            sources.forEach(source => {
                if (source.name == sn) source.space(app.name, callback)
            });
        }
    }
    getReviews(app, callback){
        if(checkApp(app, callback)){
            let sn = app.getSource().name;
            sources.forEach(source => {
                if (source.name == sn) source.reviews(app.name, callback)
            });
        }
    }
    install(app, callback){
        if(checkApp(app, callback)){
            let sn = app.getSource().name;
            sources.forEach(source => {
                if (source.name == sn) source.install(app.name, callback)
            });
        }
    }
}