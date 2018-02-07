/**
 * @typedef {Object} ListParameters
 * @property {Array<String>} categories Apps category
 * @property {Array<number>} ratings Apps ratings
 * @property {Boolean} installed Show only installed apps
 */
/**
 * @typedef {Object} App
 * @property {String} name App name
 * @property {String} version App version
 */
/**
 * @typedef {Object} NeededSpace
 * @property {number} toDownload Bytes count
 * @property {number} toInstall Bytes count
 */
/**
 * @typedef {Object} Image
 * @property {String} thumbnail Link to image
 * @property {String} fullSize Link to image
 */

var packages = [
        {
            name: 'pseudopkg-0',
            version: '0.0.0'
        },
        {
            name: 'pseudopkg-1',
            version: '0.1.0'
        },
        {
            name: 'pseudopkg-2',
            version: '1.1.0'
        },
        {
            name: 'pseudopkg-3',
            version: '0.2.0'
        },
        {
            name: 'pseudopkg-4',
            version: '0.5.0'
        },
        {
            name: 'pseudopkg-5',
            version: '3.7.0'
        },
        {
            name: 'pseudopkg-6',
            version: '0.0.19'
        },
        {
            name: 'pseudopkg-7',
            version: '0.9.0'
        },
        {
            name: 'pseudopkg-8',
            version: '45.0.0-beta'
        },
        {
            name: 'pseudopkg-9',
            version: '67'
        }
    ],
    images = [
        {
            app: 'pseudopkg-9',
            thumb: 'http://screenshots.ubuntu.com/thumbnail-with-version/vlc/2.0.1',
            src: 'http://screenshots.ubuntu.com/screenshot-with-version/vlc/2.0.1',
        },
        {
            app: 'pseudopkg-9',
            thumb: 'http://screenshots.ubuntu.com/thumbnail-with-version/vlc/2.0.1',
            src: 'http://screenshots.ubuntu.com/screenshot-with-version/vlc/2.0.1',
        },
        {
            app: 'pseudopkg-8',
            thumb: 'http://screenshots.ubuntu.com/thumbnail-with-version/vlc/2.0.1',
            src: 'http://screenshots.ubuntu.com/screenshot-with-version/vlc/2.0.1',
        },
        {
            app: 'pseudopkg-1',
            thumb: 'http://screenshots.ubuntu.com/thumbnail-with-version/vlc/2.0.1',
            src: 'http://screenshots.ubuntu.com/screenshot-with-version/vlc/2.0.1',
        },
    ],
    reviews = [
        {
            rating: 5,
            app: 'pseudopkg-1',
            lang: "en",
            uname: "Joel Bowman",
            text: "Just played this game on my laptop which never thought could run a game but works. It installed in about 10 to 15 minutes not that biga file and runs great on oneiric ocelot beta 2",
            summary: "Actually really like it",
            version: "0.50+dfsg1-1ubuntu1",
            date: "2011-10-03 04:56:09",
        },
        {
            rating: 5,
            app: 'pseudopkg-9',
            lang: "en",
            uname: "Joel Bowman",
            text: "Just played this game on my laptop which never thought could run a game but works. It installed in about 10 to 15 minutes not that biga file and runs great on oneiric ocelot beta 2",
            summary: "Actually really like it",
            version: "0.50+dfsg1-1ubuntu1",
            date: "2011-10-03 04:56:09",
        },
        {
            rating: 4,
            app: 'pseudopkg-9',
            lang: "en",
            uname: "Joel Bowman",
            text: "Just44444 played this game on my laptop which never thought could run a game but works. It installed in about 10 to 15 minutes not that biga file and runs great on oneiric ocelot beta 2",
            summary: "Actually really like it",
            version: "0.50+dfsg1-1ubuntu1",
            date: "2011-10-03 04:56:09",
        },
    ],
    ratings = {
        'pseudopkg-0': 4.56745,
        'pseudopkg-1': 1,
        'pseudopkg-2': 3.33333,
        'pseudopkg-3': 2.14759,
        'pseudopkg-4': 3.56675,
        'pseudopkg-5': 5,
        'pseudopkg-6': 4.85673,
        'pseudopkg-7': 4.67982,
        'pseudopkg-8': 4.90324,
        'pseudopkg-9': 4.11204
    },
    installed = [
        'pseudopkg-0',
        'pseudopkg-1',
        'pseudopkg-2',
    ],
    cache = {};
module.exports = (Interface=>{
    return Interface._properties = {
        platform: 'linux',  // false - all platforms
        arch: false         // false - all archs
    }, Interface
})(class{
    constructor(){
        // init cache
        cache.apps = {};
        packages.forEach(app => {
            cache.apps[app.name] = {
                version: app.version,
                images: [],
                reviews: {}
            }
        });
        images.forEach(image => {
            cache.apps[image.app].images.push({
                thumb: image.thumb,
                src: image.src
            })
        });
        reviews.forEach(review => {
            var v = review.version == cache.apps[review.app].version ? 'this' : review.version
            cache.apps[review.app].reviews[v] || (cache.apps[review.app].reviews[v] = {});
            cache.apps[review.app].reviews[v][review.lang] || (cache.apps[review.app].reviews[v][review.lang] = []);
            cache.apps[review.app].reviews[v][review.lang].push({
                text: review.text,
                user: review.uname,
                summary: review.summary,
                rating: review.rating
            })
        });
        for(let i in ratings){
            cache.apps[i].rating = ratings[i]
        }
        installed.forEach(app => {
            cache.apps[app].installed = true
        })
    }
    /**
     * Lists all avaiable apps
     * @param {ListParameters} params Parameters for getting indexes
     * @param {function(Error, Array<App>):void} callback Standard NodeJS callback
     * @return {Void}
     */
    list(params, callback){
        // do some stuff
    }
    /**
     * Gets links for avaiable images for app (jpg, png, gif, svg, etc. (all supported by Chromium))
     * @param {String} name App name
     * @param {function(Error, Array<Image>):void} callback Standard NodeJS callback
     * @return {Void}
     */
    images(name, callback){
        // do some stuff
    }
    /**
     * Gets needed space for app and dependices
     * @param {String} name App name
     * @param {function(Error, NeededSpace):void} callback Standard NodeJS callback
     * @return {Void}
     */
    space(name, callback){ // collect with dependices!!!
        // do some stuff
    }
    /**
     * Rates app
     * @param {String} name App name
     * @param {number} value "Stars" count (1-5)
     * @param {function(Error):void} callback Standard NodeJS callback
     * @return {Void}
     */
    rate(name, value, callback){
        // do some stuff
    }
    /**
     * Gets app's rating
     * @param {String} name App name
     * @param {number} value "Stars" count (1-5)
     * @param {function(Error):void} callback Standard NodeJS callback
     * @return {Void}
     */
    rating(name, callback){
        // do some stuff
    }
})