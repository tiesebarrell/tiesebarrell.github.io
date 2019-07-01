
/**
 * Module 'preferences'.
 */

var preferences = (function() {

    var preferences = {
        "theme" : "theme"
    };

    function localStorageSupported() {
        return typeof(Storage) !== "undefined";
    }

    function storeThemeInternal(themeId) {
        localStorage.setItem(preferences.theme, themeId);
    }

    function getThemeInternal() {
        if (localStorageSupported()){
            return localStorage.getItem(preferences.theme);
        } else {
            return null;
        }
    }

    return {
        storeTheme: function(themeId) {
            storeThemeInternal(themeId);
        },

        getTheme: function() {
            return getThemeInternal();
        }
    };

})();

