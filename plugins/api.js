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
                if (source.name == sn) source.rating(app.name, callback)
            });
        }
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