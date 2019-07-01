
/**
 * Module 'theme'.
 */

var theme = (function() {

    var selectors = {
        "light" : "theme-light",
        "white" : "theme-white",
        "dark" : "theme-dark"
    };

    function setThemeInternal(themeId) {
        $("body").attr('class', themeId);
    }

    function chooseThemeInternal(themeName) {
        var themeId = selectors[themeName];
        setThemeInternal(themeId);
        schedulePreferencesPrompt(themeId);
    }

    function schedulePreferencesPrompt (themeId) {
        window.setTimeout(function() {
            preferencesPrompt(themeId);
        }, 3333);
    }

    function preferencesPrompt (themeId) {
        $('#themeToast').toast('show');
        // var answer = confirm("You changed the theme. We hope you like the new look. Would you like to store it for your future visits?");
        // if (answer == true) {
        //     preferences.storeTheme(themeId);
        // }
    }

    return {
        applyTheme: function() {
            var themeId = preferences.getTheme();
            if (themeId !== null) {
                setThemeInternal(themeId);
            }
        },

        chooseTheme: function(themeName) {
            chooseThemeInternal(themeName);
        }
    };

})();

