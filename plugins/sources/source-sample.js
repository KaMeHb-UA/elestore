/**
 * @typedef {Object} ListParameters
 * @property {Array<String>} categories Apps category
 * @property {Array<number>} ratings Apps ratings
 * @property {Boolean} installed Show only instaled apps
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

module.exports = (Interface=>{
    return Interface._properties = {
        platform: 'linux',  // false - all platforms
        arch: false         // false - all archs
    }, Interface
})(class{
    constructor(){
        // do some acts if needed (for example, init cache)
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
     * @param {function(Error, Array<String>):void} callback Standard NodeJS callback
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