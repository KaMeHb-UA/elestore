/**
 * @typedef {Object} ListParameters
 * @property {Array<String>} categories Apps category
 * @property {Array<number>} ratings Apps ratings
 * @property {Boolean} installed Show only instaled apps
 */
/**
 * @typedef {Object} App
 * @property {String} name App name
 * @property {String} displayName App name
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
/**
 * @typedef {Object} ReviewProperties
 * @property {String} lang Review lang
 * @property {number} rate Rate for app
 */
/**
 * @typedef {Object} Review
 * @property {number} rating Rating attached to review
 * @property {String} uname User name
 * @property {String} summary Review title
 * @property {String} text Review text
 * @property {String} date Date of publish
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
    ratingsCount = {
        'pseudopkg-0': 679,
        'pseudopkg-1': 1563,
        'pseudopkg-2': 854,
        'pseudopkg-3': 435,
        'pseudopkg-4': 439,
        'pseudopkg-5': 501,
        'pseudopkg-6': 6573,
        'pseudopkg-7': 344,
        'pseudopkg-8': 127,
        'pseudopkg-9': 198
    },
    ratedByMe = {
        'pseudopkg-0': 4,
        'pseudopkg-1': 2,
        'pseudopkg-8': 1
    },
    installed = [
        'pseudopkg-0',
        'pseudopkg-1',
        'pseudopkg-2',
    ],
    categories = {
        'pseudopkg-0': [
            'Administrative',
            'Media',
        ],
        'pseudopkg-1': [
            'Text',
            'Media',
        ],
        'pseudopkg-2': [
            'Tools',
            'Media',
        ],
        'pseudopkg-3': [
            'Tools',
            'Administrative',
        ],
        'pseudopkg-4': [
            'Tools',
            'Text',
        ],
        'pseudopkg-5': [
            'Administrative',
            'Text',
        ],
    },
    displayNames = {
        'pseudopkg-0': 'pseudoPackage 0',
        'pseudopkg-2': 'pseudoPackage 2',
        'pseudopkg-6': 'pseudoPackage 6',
    },
    spaces = {
        'pseudopkg-0': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-1': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-2': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-3': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-4': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-5': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-6': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-7': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-8': {
            toDownload: 8546146,
            toInstall: 23434534
        },
        'pseudopkg-9': {
            toDownload: 8546146,
            toInstall: 23434534
        },
    },
    cache = {};
module.exports = (Interface=>{
    return Interface._properties = {
        platform: 'linux',  // false - all platforms
        arch: false,        // false - all archs
        dependencies: {    // all dependencies needed by plugin, like in package.json
            // async: "^2.6.0" // <-- JUST EXAMPLE
        }
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
            var v = review.version == cache.apps[review.app].version ? 'this' : review.version;
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
        });
        for(let i in categories){
            cache.apps[i].categories = categories[i]
        }
        for(let i in displayNames){
            cache.apps[i].displayName = displayNames[i]
        }
        for(let i in spaces){
            cache.apps[i].neededSpace = spaces[i]
        }
        for(let i in ratingsCount){
            cache.apps[i].ratingsCount = ratingsCount[i]
        }
        for(let i in ratedByMe){
            cache.apps[i].myRating = ratedByMe[i]
        }
    }
    /**
     * Lists all avaiable apps
     * @param {ListParameters=} params Parameters for getting indexes
     * @param {function(Error, Array<App>):void} callback Standard NodeJS callback
     * @return {Void}
     */
    list(params, callback){
        !callback && (typeof params == 'function') && (callback = params, params = {}) // if params is not defined

        var appsDB = [], conditions, i;
        for(i in cache.apps){
            conditions = true;
            if (params.installed !== undefined && cache.apps[i].installed != params.installed) conditions = false;
            if (conditions && params.ratings && !(params.ratings.indexOf(cache.apps[i].rating) + 1)) conditions = false;
            if (conditions && params.categories && !(a => {
                params.categories.forEach(category => {
                    cache.apps[i].categories.forEach(targetCategory => {
                        category == targetCategory && (a = true)
                    })
                }); return a
            })(false)) conditions = false;
            conditions && appsDB.push({
                name: i,
                displayName: cache.apps[i].displayName,
                version: cache.apps[i].version
            })
        }
        callback(null, appsDB)
    }
    /**
     * Gets links for avaiable images for app (jpg, png, gif, svg, etc. (all supported by Chromium))
     * @param {String} name App name
     * @param {function(Error, Array<Image>):void} callback Standard NodeJS callback
     * @return {Void}
     */
    images(name, callback){
        var tmp = [];
        cache.apps[name].images.forEach(img => {
            tmp.push({
                thumbnail: img.thumb,
                fullSize: img.src
            })
        }); callback(null, tmp)
    }
    /**
     * Gets needed space for app and dependices
     * @param {String} name App name
     * @param {function(Error, NeededSpace):void} callback Standard NodeJS callback
     * @return {Void}
     */
    space(name, callback){ // collect with dependices!!!
        callback(null, cache.apps[name].neededSpace)
    }
    /**
     * Rates app
     * @param {String} name App name
     * @param {number} value "Stars" count (1-5)
     * @param {function(Error):void} callback Standard NodeJS callback
     * @return {Void}
     */
    rate(name, value, callback){
        (
            cache.apps[name].myRating && (
                callback(new Error('Cannot rate twice')),
                true
            )
        ) || (
            cache.apps[name].rating = ((cache.apps[name].rating * cache.apps[name].ratingsCount++) + value) / cache.apps[name].ratingsCount,
            cache.apps[name].myRating = value,
            callback(null)
        )
    }
    /**
     * Gets app's rating
     * @param {String} name App name
     * @param {function(Error, number):void} callback Standard NodeJS callback
     * @return {Void}
     */
    rating(name, callback){
        callback(null, cache.apps[name].rating)
    }
    /**
     * Adds a review to app
     * @param {String} name App name
     * @param {ReviewProperties} props Review's properties
     * @param {String} review Review text
     * @param {String} reviewShort Short review text (heading)
     * @param {function(Error):void} callback Standard NodeJS callback
     * @return {Void}
     */
    review(name, props, review, reviewShort, callback){
        cache.apps[name].reviews.this[props.lang] || (cache.apps[name].reviews.this[props.lang] = []);
        cache.apps[name].reviews.this[props.lang].push({
            text: review,
            user: cache.me.uname,
            summary: reviewShort,
            rating: props.rate
        });
        this.rate(name, props.rate, callback)
    }
    /**
     * Gets app's reviews
     * @param {String} name App name
     * @param {Array<String>=} langs Langs to load with
     * @param {function(Error, Array<Review>):void} callback Standard NodeJS callback
     * @return {Void}
     */
    reviews(name, langs, callback){
        !callback && (typeof langs == 'function') && (callback = langs, langs = false) // if langs is not defined
        var tmp = [];
        for(var lang in cache.apps[name].reviews.this){
            ((langs && (langs.indexOf(lang) + 1)) || !langs) && (
                cache.apps[name].reviews.this[lang].forEach(review => {tmp.push(review)})
            )
        }
        callback(null, tmp)
    }
})