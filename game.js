var game = function() {
    
    var VERSION = "1.0";
    var DISPLAY_HEIGHT = 30;
    var MAX_CHARACTERS = 128;
    var BASE_HITPOINTS = 10;

    var player = new Player();
    var monster;
    
	var weapons = [
        new Weapon("rusty dagger", new Dice([4], -1)),
        new Weapon("bronze dagger", new Dice([4], 0)),
        new Weapon("bone dagger", new Dice([4, 4], -2)),
        new Weapon("rusty sword", new Dice([4], 1)),
        new Weapon("cracked kris", new Dice([10], -2)),
        new Weapon("foul-smelling bag", new Dice([6], 0)),
        new Weapon("iron scimitar", new Dice([6], 1)),
        new Weapon("polished fang", new Dice([4, 4], 0)),
        new Weapon("sharpened hatchet", new Dice([4, 6], -1)),
        new Weapon("crude bludgeon", new Dice([6], 2)),
        new Weapon("primal dagger", new Dice([10], 0)),
        new Weapon("steel mace", new Dice([4, 4], 1)),
        new Weapon("silver cutlass", new Dice([4, 6], 0)),
        new Weapon("smoke bomb", new Dice([4, 8], -1)),
        new Weapon("fire sabre", new Dice([12], 0)),
        new Weapon("brass knuckles", new Dice([10], 1)),
        new Weapon("rod of finding", new Dice([4], 4)),
        new Weapon("bastard flail", new Dice([4, 8], 0)),
        new Weapon("poison dart", new Dice([4, 4], 2)),
        new Weapon("oak wand", new Dice([12], 1)),
        new Weapon("butcher knife", new Dice([4, 6], 2)),
        new Weapon("glyphic dirk", new Dice([6, 8], 0)),
        new Weapon("glyphic dirk (enchanted)", new Die([4, 4, 4], 1)),
        new Weapon("cursed ranseur", new Dice([4, 4, 8], -1)),
        new Weapon("shash of choking", new Dice([8, 12], -3)),
        new Weapon("elven long bow", new Dice([6, 12], 0)),
        new Weapon("flash powder", new Dice([4, 10], 1)),
        new Weapon("orichalcum ballista", new Dice([8, 8], 1)),
        new Weapon("zweihander of felling", new Dice([4, 6], 4)),
        new Weapon("seething chakrams", new Dice([4, 4, 12], -1)),
        new Weapon("minotaur horn", new Dice([4, 4, 10], 0)),
        new Weapon("maple wand", new Dice([6, 6, 6], 0)),
        new Weapon("flaming wrench", new Dice([4, 4, 4, 4], 1)),
        new Weapon("emerald sword", new Dice([10, 12], -1)),
        new Weapon("infinity blade", new Dice([8, 20], -4)),
        new Weapon("jewel-encrusted skull", new Dice([6, 6, 8], 0)),
        new Weapon("adamantite blade staff", new Dice([20], 0)),
        new Weapon("bloodstained sceptre", new Dice([4, 4, 4, 6], 1)),
        new Weapon("clay golem", new Dice([4, 6, 12], 0)),
        new Weapon("giant anchor", new Dice([4, 4, 10], 2)),
        new Weapon("centaur bow", new Dice([4, 10, 10], -1)),
        new Weapon("rune pouch", new Dice([4, 4, 6], 4)),
        new Weapon("golden scythe", new Dice([4, 20], 0)),
        new Weapon("basalt sword", new Dice([6, 20], -1)),
        new Weapon("bottle of acid", new Dice([8, 10], 4)),
        new Weapon("gossamer stiletto", new Dice([6, 6, 6, 6], 0)),
        new Weapon("elinvar spear", new Dice([4, 4, 6, 6], 2)),
        new Weapon("kinslayer crossbow", new Dice([4, 4, 20], -1)),
        new Weapon("supreme magma blade", new Dice([6, 6, 8], 3)),
        new Weapon("mahogany wand", new Dice([4, 4, 4, 4, 4, 4], 0)),
        new Weapon("magic scroll (lightning)", new Dice([8, 20], 0)),
        new Weapon("maddening morning star", new Dice([12, 12], 2)),
        new Weapon("potion of strength", new Dice([6, 10], 6)),
        new Weapon("redsteel cutlass", new Dice([6, 10, 12], 0)),
        new Weapon("aberrant fetish", new Dice([4, 4, 6, 6, 8], -1)),
        new Weapon("war axe of reckoning", new Dice([4, 10, 20], -3)),
        new Weapon("suspended dagger", new Dice([4, 4, 8, 10], 1)),
        new Weapon("diamond-tipped katar", new Dice([4, 4, 8, 8], 2)),
        new Weapon("greatsword of heart", new Dice([4, 6, 8, 10], 0)),
        new Weapon("magic scroll (meteor strike)", new Dice([6, 6, 6, 8], 1)),
        new Weapon("seven-branched sword", new Dice([4, 4, 10], 6)),
        new Weapon("glass katana", new Dice([6, 12, 12], 0)),
        new Weapon("meteorite greathammer", new Dice([12], 10)),
        new Weapon("magnificent j", new Dice([8, 8, 10], 2)),
        new Weapon("sovereign demon heart", new Dice([8, 8, 8, 12], -3)),
        new Weapon("immovable wand", new Dice([12, 20], 0)),
        new Weapon("aureate scimitar", new Dice([4, 4, 4, 4, 4, 6], 1)),
        new Weapon("lord master trident", new Dice([4, 4, 12], 6)),
        new Weapon("ioun stone", new Dice([8, 8, 8, 8], 0)),
        new Weapon("big dragon dawn", new Dice([4, 6], 12)),
        new Weapon("mithril sword", new Dice([4, 10, 20], 0)),
        new Weapon("gale valley broadsword", new Dice([10, 20], 4)),
        
    ];
    
    var game = {
        
        
    };
    
    var commands = [
        new Command(['help', 'info', 'h', '?'], function(argument) {
            
            screen.output("attack: attack monster");
            screen.output("evade: ecape from monster");
            screen.output("use [item]: use item");
            screen.output("equip [weapon]: switch weapons");
            screen.output("alias [command]: list alternative names for a command");
            screen.output("new: create a new game");
        }),
        new Command(['alias', 'name', 'alt'], function(argument) {
            
            var command = getCommand(argument);
            
            if(command == null) {
                
                screen.output("argument not recognized as command");
            }
            else {
                
                command.identifiers.forEach(function(identifier) {
                    
                    screen.output(identifier);
                });
            }
        })
    ];
    
    var screen = {
        
        element: $('#screen'),
        screenRowTemplate: $('#template-screen-row'),
        init: function() {
            
            var row = _.template(this.screenRowTemplate.html())({
                text: "",
                type: " output"
            });
            
            for(var i = 0; i < DISPLAY_HEIGHT; i++) {
                
                this.element.append(row);
            }
        },
        input: function(text) {
            
            this.push("> " + text, false);
        },
        output: function(text) {
            
            this.push(text, true);
        },
        push: function(text, isOutput) {
            
            this.element.children()[0].remove();

            var row = _.template(this.screenRowTemplate.html())({
                text: text,
                type: isOutput ? " output": " input"
            });

            this.element.append(row);
        }
    };
    
    var prompt = {
        
        element: $('#prompt input'),
        history: {
            texts: [],
            MAX_TEXTS: 100,
            position: -1,
            push: function(text) {
                
                if(!(this.texts.length > 0 && this.texts[0] == text)) {

                    this.texts.unshift(text);

                    if(this.texts.length > this.MAX_TEXTS) {

                        this.texts.pop();
                    }               
                }
    
                this.resetPosition();
            },
            getSelectedText: function() {
                
                if(this.position == -1) {
                    
                    return "";
                }
                
                return this.texts[this.position];
            },
            resetPosition: function() {
                
                this.position = -1;
            },
            incrementPosition: function() {
                
                if(this.position + 1 < this.texts.length) {
                    
                    this.position++;
                }
            },
            decrementPosition: function() {
                
                if(this.position > -1) {
                    
                    this.position--;
                }
            }
        },
        init: function() {
            
            this.focus();
        },
        clear: function() {
            
            this.setText("");
        },
        setText: function(text) {
            
            this.element.val(text);
        },
        focus: function() {
            
            this.element.focus();
        },
        isEmpty: function() {
            
            return this.text.length == 0;
        },
        getText: function() {
            
            return this.element.val();
        },
        previousCommand: function() {
            
            this.history.incrementPosition();
            this.setText(this.history.getSelectedText());
        },
        nextCommand: function() {
            
            this.history.decrementPosition();
            this.setText(this.history.getSelectedText());
        },
        execute: function() {

            var text = this.getText();
            this.clear();

            if(text.length == 0) {

                screen.input("");
            }
            else {

                var arguments = text.split(" ");
                var command = getCommand(text);

                screen.input(text);
                this.history.push(text);

                if(command == null) {

                    screen.output("command not recognized");
                    screen.output("type 'help' for a list of commands");
                }
                else {

                    arguments.shift();
                    command.action(arguments.join(" "));
                }
            }
        }
    };

	function Item(name) {

		this.name = name;
	}
    
    function Armor(name, armor) {
        
        Item.call(this, name);
        
        this.armor = armor;
    }
    
    function Weapon(name, dice) {
        
        Item.call(this, name);
        
        this.dice = dice;
    }
    
    Weapon.prototype.roll = function() {
        
        return this.dice.roll();
    };
    
    function Dice(dice, modifier) {
        
        this.dice = dice.map(function(die) {
           
            return new Die(die);
        });
        this.dice = this.dice.sort(function(die1, die2) {
            
            return die1.sides - die2.sides;
        });
        this.modifier = modifier || 0;
        /*
        this.display = (function() {

            var display = "";
            var currentSides = 0;
            var diceGroups = [];
            var i = 0;

            if(this.modifier != 0) {

                display = (this.modifier > 0 ? "+ ":"- ") + this.modifier.toString();
            }

            if(this.dice.length == 0) {

                return display.substring(2);
            }

            currentSides = this.dice[0].sides;
            diceGroups.push([currentSides, 0])

            this.dice.forEach(function(die) {

                if(die.sides == currentSides) {

                    diceGroups[i] = [diceGroups[i][0], diceGroups[i][1] + 1];
                }
                else {

                    currentSides = die.sides;
                    diceGroups.push([currentSides, 1]);
                }
            });

            for(var i = 0; i < diceGroups.length; i++) {

                diceGroups[i] = "+ " + diceGroups[i][1].toString() + "d" + diceGroups[i][0].toString();
            }

            display = diceGroups.join(" ");
            display = display.substring(2);

            return display;
        })();
        */
    }
    
    Dice.prototype.roll = function() {
        
        var value = 0;
        
        for(var i = 0; i < this.dice.length; i++) {
            
            value += this.dice[i].roll();
        }
        
        return value < 0 ? 0 : value;
    };
    
    function Die(sides) {
        
        this.sides = sides;
    }
    
    Die.prototype.roll = function() {
        
        return randomInt(1, this.sides + 1);
    };
    
    function Command(identifiers, action) {
        
        this.identifiers = identifiers;
        this.action = action;
    }
    
    function Entity(name, lunge, leap, life, luck, lurk) {
        
        this.name = name;
        this.lunge = lunge;
        this.leap = leap;
        this.life = life;
        this.luck = luck;
        this.lurk = lurk;
        this.hitpoints = BASE_HITPOINTS + this.life;
    }
    
    Entity.prototype.getLevel = function() {
        
        return this.lunge + this.leap + this.life + this.luck + this.lurk
    };
    
    Entity.prototype.getDisplay = function() {
        
        return this.name + "(" + this.getLevel().toString() + ")";
    };
    
    function Player() {
        
        Entity.call(this, "you", 0, 0, 0, 0, 0)
    }
    
    function Monster(name, lunge, leap, life, lurk) {
        
        Entity.call(this, name, lunge, leap, life, 0, lurk)
    }
    
    function inherit(proto, obj) {
        
        obj.prototype = Object.create(proto.prototype);
        obj.prototype.constructor = obj;
    }
    
    inherit(Item, Armor);
    inherit(Item, Weapon);
    inherit(Entity, Player);
    inherit(Entity, Monster);
    
    function randomInt(min, max) {
        
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $(document).keydown(function(event) {
        
        var keyCode = event.which;
        
        // enter
        if(keyCode == 13) {
            
            prompt.execute();
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
    
    function getCommand(text) {
        
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
    
    $(document).keyup(function(event) {
       
        prompt.focus();
    });

    function init() {
        
        screen.init();
        prompt.init();
    }

	function main() {

        init();
        screen.output("loading dungeon clicker v" + VERSION + " ...");
        screen.output("dungeon clicker loaded");
        screen.output("type 'help' for a list of commands");
        screen.output("---");
        screen.output("starting new game");
	}

	main();
};

$(function () {

	game();
});