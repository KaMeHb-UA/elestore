var sources = [], cache = {};
function setUpPromise(asyncFunction){
    return function(){
        var args = arguments;
        args.push = val => {
            args[args.length++] = val;
        }
        return new Promise(function(resolve, reject){
            args.push(function(){
                var err = arguments[0], i, neededArgs = [];
                for(i = 1; i < arguments.length; i++){
                    neededArgs.push(arguments[i])
                }
                if(!err) resolve(...neededArgs); else reject(err)
            });
            asyncFunction(...args)
        })
    }
}
function checkApp(app, callback){
    if(!app || !app.getSource){
        callback(new Error('app has no method getSource()'));
        return false;
    } else return true;
}
class appsDB extends Array{
    constructor(){
        super(...arguments);
    }
    sortBy(prop){
        if(typeof prop != 'string') return new TypeError('prop arg is not of type string');
        var expl = false;
        this.forEach(app => {
            if(!expl){
                if(typeof app[prop] != 'number') expl = true;
            }
        });
        if(expl) return new TypeError(`app[${JSON.stringify(prop)}] is not of type number`); else {
            return new appsDB(...(this.sort((app1, app2) => {
                return app2[prop] - app1[prop]
            })))
        }
    }
}

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
        this.toInit = [

            `window.appsDB = eval(${JSON.stringify(`(()=>{${appsDB.toString()};return appsDB})()`)})`,
            `window.setUpPromise = eval(${JSON.stringify(`(()=>{${setUpPromise.toString()};return setUpPromise})()`)})`
        ].join(';');
        (list => {
            list.forEach(method => {
                var temp = this[method];
                this[method] = function(){
                    if (temp.length == arguments.length) temp.apply(this, arguments); else return setUpPromise(temp).apply(this, arguments)
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
        if(checkApp(app, callback)){
            let sn = app.getSource().name;
            sources.forEach(source => {
                if (source.name == sn){
                    source.rating(app.name, callback)
                }
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