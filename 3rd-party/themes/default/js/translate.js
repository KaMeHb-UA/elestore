(()=>{
    /**
     * Translates text
     * @param {String} text Text to translate
     * @param {String=} context Phrase context
     * @param {String=} lang Language to translate to
     * @return {Void}
     */
    function __(text, context = 'core', lang = null){
        return text;
    }
    /**
     * Translates text and writes it directly to the page (like document.write)
     * @param {String} text Text to translate
     * @param {String=} context Phrase context
     * @param {String=} lang Language to translate to
     * @return {Void}
     */
    function _t(text, context = 'core', lang = null){
        document.write(__(text, context, lang))
    }
    window.__ = __;
    window._t = _t;
})();