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
        // do some acts if needed (for example, init cache)
    }
    /**
     * Lists all avaiable apps
     * @param {ListParameters=} params Parameters for getting indexes
     * @param {function(Error, Array<App>):void} callback Standard NodeJS callback
     * @return {Void}
     */
    list(params, callback){
        !callback && (typeof params == 'function') && (callback = params, params = {}) // if params is not defined
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
     * @param {function(Error, number):void} callback Standard NodeJS callback
     * @return {Void}
     */
    rating(name, callback){
        // do some stuff
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
        // do some stuff
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
        // do some stuff
    }
    /**
     * Installs an app
     * @param {String} name App name
     * @param {function(Error):void} callback Standard NodeJS callback
     * @return {Void}
     */
    install(name, callback){
        // do some stuff
    }
})