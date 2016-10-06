(function() {
    
    var screen = app.screen,
        game = app.game,
        prompt = app.prompt,
        entities = app.entities;

    function Command(identifiers, action) {
        
        this.identifiers = identifiers;
        this.action = action;
    }
    
    Command.prototype.execute = function(argument) {
        
        this.action(argument);
    };
    
    var gameInfo = [
        app.NAME + " is a text-based dungeon crawler",
        "each game consists of a sequence of encounters with one or more monsters",
        "each turn, the player may choose to attack or evade the monsters",
        "",
        "attack: roll {d20 + your lunge - monster leap}",
        ">20    critical hit (double damage)",
        "10-19  hit",
        "4-9    miss",
        "<4     trip (take {4 - attack roll} damage)"
    ];

    var commands = [
        
        new Command(
            ['help', 'h', '?'], function(argument) {

                screen.output("attack (monster): attack monster; if no monster is specified, attack first monster");
                screen.output("evade: ecape from monster");
                screen.output("equip [weapon]: switch weapons");
                screen.output("alias [command]: list alternative names for a command");
                screen.output("new: start a new game");
        }),
        new Command(
            ['info', 'instructions'], function(argument) {

                gameInfo.forEach(function(line) {
                    
                    screen.output(line);
                });
        }),
        new Command(
            ['alias', 'name', 'alt'], function(argument) {

                var command = app.commands.getCommand(argument);

                if(command == null) {

                    screen.output("argument not recognized as command");
                }
                else {

                    command.identifiers.forEach(function(identifier) {

                        screen.output(identifier);
                    });
                }
        }),
        new Command(
            ['attack', 'strike', 'hit', 'a'], function(argument) {

                game.attack();
        }),
        new Command(
            ['stats', 's'], function(argument) {

                var player = game.getPlayer(),
                    monster = game.getMonster();
                
                screen.output(player.getStatus());
                screen.output("level: " + player.getLevel().toString() + (player.hasUnspentPoints() ? " (" + player.pointsToSpend.toString() + " unspent points)":""));
                screen.output(player.getStats());
                screen.output();
                screen.output(monster.getStatus());
                screen.output("level: " + monster.getLevel().toString());
                screen.output(monster.getStats());
        }),
        new Command(
            ['new', 'n'], function(argument) {

                game.newGame();
        }),
        new Command(
            ['evade', 'escape', 'dodge', 'e'], function(argument) {

                game.evade();
        }),
        new Command(
            ['inv', 'inventory', 'i'], function(argument) {

                game.getPlayer().inventory.getDisplay().forEach(function(message) {
                    
                    screen.output(message);
                });
        }),
        new Command(
            ['level', 'lvl', 'l', '+'], function(argument) {

                var player = game.getPlayer();
                
                if(player.hasUnspentPoints()) {
                    
                    if(entities.isValidStat(argument)) {
                        
                        player.incrementStat(argument);
                        screen.output(argument + " increased");
                    }
                    else {
                        
                        screen.output("not a valid stat");
                    }
                }
                else {
                    
                    screen.output(player.toString() + " has no points to spend");
                }
        })
    ];
    
    // public interface
    app.commands = {
   
        executeCommand: function() {

            var text = prompt.getText();
            prompt.clear();

            if(text.length == 0 || screen.isPrinting()) {

                screen.input("");
            }
            else {

                var arguments = text.split(" ");
                var command = app.commands.getCommand(text);
  
                screen.input(text);
                prompt.history.push(text);

                if(command == null) {

                    screen.output("command not recognized");
                    screen.output("type 'help' for a list of commands");
                }
                else {

                    arguments.shift();
                    command.execute(arguments.join(" "));
                }
            }
        },
        getCommand: function(text) {

            var arguments = text.split(" ");

            if(arguments.length >= 1) {

                for(var i = 0; i < commands.length; i++) {

                    if(_.indexOf(commands[i].identifiers, arguments[0]) > -1) {

                        return commands[i];
                    }
                }
            }

            return null;
        }
    };
})();