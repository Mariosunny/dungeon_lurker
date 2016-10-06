$(function() {
    
    var screen = app.screen,
        prompt = app.prompt,
        commands = app.commands,
        entities = app.entities,
        game = app.game;

    $(document).keydown(function(event) {

        var keyCode = event.which;

        // enter
        if(keyCode == 13) {

            commands.executeCommand();
        }
        // up key
        else if(keyCode == 38) {

            prompt.previousCommand();
        }
        // down key
        else if(keyCode == 40) {

            prompt.nextCommand();

        }
        // tab
        else if(keyCode == 9) {

            event.preventDefault();
        }
    });
    
    function welcomeMessage() {
        
        screen.output("type 'help' for a list of commands");
        screen.output("---");
    }
    
    function initialize() {
        
        screen.output("loading " + app.NAME + " v" + app.VERSION.MAJOR.toString() + "." + app.VERSION.MINOR.toString() + " ...");
        // initialization
        screen.output(app.NAME + " loaded");
    }
    
    function main() {
        
        initialize();
        welcomeMessage();
        game.newGame();
    }
    
    main();
});