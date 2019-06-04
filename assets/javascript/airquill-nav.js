
/**
 * Module 'nav'.
 */

var nav = (function() {

    var selectors = {
        "default" : "theme-default",
        "light" : "theme-light",
        "white" : "theme-white",
        "dark" : "theme-dark"
    };

    function setThemeInternal(themeName) {
        //alert(themeName + ": " + selectors[themeName]);
        $("body").attr('class', selectors[themeName]);
    }

    function searchInternal(scope) {
        scope.q.value = scope.q.value + " site:airquill.io";
    }

    return {
        setTheme: function(themeName) {
            //alert("This function is not implemented just yet, sorry :)");
            setThemeInternal(themeName);
        },

        search: function(scope) {
            searchInternal(scope);
        }
    };

})();