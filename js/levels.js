(function() {
    
    function getLevel(exp) {
        
        return Math.floor(Math.pow(exp, (3.0/7.0)));
    }
    
    app.levels = {
        
        getLevel: function(exp) {
            
            return getLevel(exp);
        }
    };
})();
