(function() {
    
    var entities = app.entities,
        screen = app.screen,
        dice = app.dice,
        util = app.util;
    
    var player;
    var monster;
    var kills = 0;
    var round = 0;
    var d20 = dice.newDice([20], 0);

    function newGame() {
        
        screen.output("starting new game");
        player = entities.newPlayer();
        kills = 0;
        newEncounter();
    }
    
    function newEncounter() {
        
        round = 0;
        monster = nextMonster();
        player.restoreHitpoints();
        screen.output(player.toString() + " encountered " + monster.toString() + " !", 500);
    }
    
    function nextMonster() {
        
        return entities.getMonster(player.getLevel());
    }
    
    function evade() {
        
        var playerLurk = player.lurk;
        var monsterLurk = monster.lurk;
        var baseLurkRoll = d20.roll();
        var lurkRoll = baseLurkRoll + playerLurk - monsterLurk;
        
        screen.output(player.toString() + " attempted to sneak away from " + monster.toString());
        screen.output(player.toString() + " rolled a " + lurkRoll.toString());
        
        if(lurkRoll >= 10) {
            
            screen.output(player.toString() + " EVADED " + monster.toString());
            screen.output();
            newEncounter();
            return;
        }
        else {
            
            screen.output(player.toString() + " ALERTED " + monster.toString());
            screen.output();
            takeTurn(monster, player, 2);
        
            if(checkPlayerStatus() && checkMonsterStatus()) {

                endRound();
            }
        }
    }
    
    function attack() {
        
        takeTurn(player, monster);
        
        if(checkPlayerStatus() && checkMonsterStatus()) {

            screen.output();
            takeTurn(monster, player);
            
            if(checkPlayerStatus() && checkMonsterStatus()) {
            
                endRound();
            }
        }
    }
    
    function checkMonsterStatus() {
        
        if(monster.isDead()) {
            
            monsterDeath();
            return false;
        }
        
        return true;
    }
    
    function checkPlayerStatus() {
        
        if(player.isDead()) {
            
            playerDeath();
            return false;
        }
        
        return true;
    }
    
    function playerDeath() {
        
        screen.output();
        screen.output(player.toString() + " died to " + monster.toString(), 500);
        screen.output();
        newGame();
    }
    
    function monsterDeath() {
        
        var expDrop = monster.expDrop;
        var previousLevel = player.getLevel();
        var currentLevel;
        var baseLootRoll = d20.roll();
        var lootRoll = baseLootRoll + player.luck - monster.luck;
        
        screen.output();
        screen.output(player.toString() + " killed " + monster.toString() + " and gained " + expDrop.toString() + " exp", 500);
        player.addExp(monster.expDrop);
        currentLevel = player.getLevel();
        
        if(currentLevel > previousLevel) {
            
            player.levelUp();
            screen.output(player.toString() + " are now level " + currentLevel.toString());
        }
        
        if(lootRoll >= 10) {
            
            var message = player.toString() + " found " + loot.toString() + " among the remains";
            
            if(player.inventory.isFull()) {
                
                message += " but could not pick it up as your inventory is full";
            }
            else {
                
                player.inventory.addItem(loot);
            }
            
            screen.output(message);
        }
        else {
            
            screen.output(player.toString() + " found nothing among the remains")
        }
        
        screen.output();
        
        newEncounter();
    }
    
    function endRound() {
        
        round++;
        screen.output("", 500);
        screen.output(player.getStatus());
        screen.output(monster.getStatus());
    }
    
    function takeTurn(attacker, defender, damageMultiplier) {
        
        damageMultiplier = damageMultiplier || 1.0;
        var weapon = attacker.inventory.getCurrentWeapon();
        var baseAttackRoll = d20.roll();
        var lunge = attacker.lunge;
        var leap = defender.leap;
        var attackRoll = baseAttackRoll + lunge - leap;
        
        screen.output(attacker.toString() + " used " + weapon.toString() + " against " + defender.toString());
        screen.output(attacker.toString() + " rolled a " + attackRoll.toString());
        
        if(attackRoll >= 10) {
            
            var baseDamageRoll = weapon.roll();
            var critical = attackRoll >= 20;
            var damageRoll = baseDamageRoll * (critical ? 2:1);
            
            damageRoll *= damageMultiplier;
            damageRoll = Math.floor(damageRoll);
            
            defender.damage(damageRoll);
            screen.output(attacker.toString() + (critical ? " CRITICALLY":"") + " HIT " + defender.toString() + " for " + damageRoll.toString() + " damage", getDamageDelay(damageRoll));
        }
        else if(attackRoll >= 4) {
            
            screen.output(attacker.toString() + " MISSED", util.randomInt(350, 650));
        }
        else {
            
            var damage = 4 - attackRoll;
            
            attacker.damage(damage);
            screen.output(attacker.toString() + " TRIPPED, taking " + damage.toString() + " damage", getDamageDelay(damage));
        }
    }
    
    function getDamageDelay(damage) {
        
        var delay = util.randomInt(200, 100*damage + 200);
        
        return delay > 1500 ? 1500: delay;
    }
    
    app.game = {
        
        getPlayer: function() {
            
            return player;
        },
        getMonster: function() {
            
            return monster;
        },
        attack: function() {

            attack();
        },
        evade: function() {
            
            evade();
        },
        newGame: function() {

            newGame();
        }
    };
})();