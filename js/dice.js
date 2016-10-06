(function() {
    
    var util = app.util;

    function Dice(dice, modifier) {

        dice = dice.sort(function(die1, die2) {

            return die1.sides - die2.sides;
        });
        this.dice = dice;
        this.modifier = modifier;
        
        this.display = (function() {

            var string = "";
            var currentSides = 0;
            var diceGroups = [];
            var i = 0;

            if(modifier != 0) {

                string = (modifier > 0 ? "+ ":"- ") + modifier.toString();
            }

            if(dice.length == 0) {

                return string.substring(2);
            }

            currentSides = dice[0].sides;
            diceGroups.push([currentSides, 0])

            dice.forEach(function(die) {

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

            string = diceGroups.join(" ");
            string = string.substring(2);

            return string;
        })();
    }
    
    Dice.prototype.toString = function() {
        
        return this.display;
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

        return util.randomInt(1, this.sides + 1);
    };

    // public interface
    app.dice = {
        
        newDice: function(dice, modifier) {
            
            return new Dice(dice.map(function(die) {

                return new Die(die);
            }), modifier);
        } 
    };
})();
