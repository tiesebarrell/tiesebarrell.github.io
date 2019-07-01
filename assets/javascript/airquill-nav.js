
/**
 * Module 'nav'.
 */

var nav = (function() {

    function searchInternal(scope) {
        scope.q.value = scope.q.value + " site:airquill.io";
    }

    return {
        setTheme: function(themeName) {
            theme.chooseTheme(themeName);
        },

        search: function(scope) {
            searchInternal(scope);
        }
    };

})();