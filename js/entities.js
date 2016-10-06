(function() {
    
    var items = app.items,
        util = app.util,
        levels = app.levels;
    
    var BASE_HITPOINTS = 10;
    var STATS = {
        lunge: "lunge",
        leap: "leap",
        life: "life",
        luck: "luck",
        lurk: "lurk"
    };
    var PLAYER_MONSTER_LEVEL_VARIANCE = 6;
    var PLAYER_MONSTER_LEVEL_DISPARITY = 2;

    function Entity(name, lunge, leap, life, luck, lurk) {
        
        this.name = name;
        this.lunge = lunge;
        this.leap = leap;
        this.life = life;
        this.luck = luck;
        this.lurk = lurk;
        this.hitpoints = 0;
        this.restoreHitpoints();
        
        var inventory = {
            currentWeapon: items.getStartingItem(),
            weapons: [],
            objects: [],
            capacity: 6,
            hasCurrentWeapon: function () {
                
                return this.currentWeapon != null;
            },
            getNumberOfItems: function() {
                
                return this.weapons.length + this.objects.length + (this.hasCurrentWeapon() ? 1:0);
            },
        };

        this.inventory = {

            addItem: function(item) {
                
                inventory.weapons.push(item);
            },
            getDisplay: function() {
                
                var display = [];
                
                display.push("capacity: (" + inventory.getNumberOfItems().toString() + "/" + inventory.capacity.toString() + ")");
                display.push("");
                display.push("** " + inventory.currentWeapon.toString());
                
                inventory.weapons.forEach(function(item) {
                    
                    display.push(item.toString());
                });
                
                return display;
            },
            isFull: function () {
                
                return inventory.getNumberOfItems() == inventory.capacity;
            },
            getCurrentWeapon: function() {
                
                return inventory.currentWeapon;
            },
            getNumberOfItems: function() {
                
                return inventory.getNumberOfItems();
            }
        }
    }
    
    Entity.prototype.getStatus = function() {
        
        return this.toString() + " (" + this.hitpoints.toString() + "/" + this.getMaxHitpoints().toString() + " hp)";
    }
    
    Entity.prototype.getStats = function() {
        
        return "lunge: " + 
            this.lunge.toString() + " | leap: " + 
            this.leap.toString() + " | life: " + 
            this.life.toString() + " | luck: " + 
            this.luck.toString() + " | lurk: " + 
            this.lurk.toString();
    }
    
    Entity.prototype.getMaxHitpoints = function() {
        
        return BASE_HITPOINTS + this.life;
    }
    
    Entity.prototype.isDead = function() {
        
        return this.hitpoints <= 0;
    }
    
    Entity.prototype.damage = function(damage) {
        
        this.hitpoints -= damage;
    }
    
    Entity.prototype.restoreHitpoints = function() {
        
        this.hitpoints = this.getMaxHitpoints();
    }
    
    Entity.prototype.getLevel = function() {
        
        var level = this.getRealLevel();
        
        return level >= 0 ? level:0;
    };
    
    Entity.prototype.getRealLevel = function() {
        
        return this.lunge + this.leap + this.life + this.luck + this.lurk;
    };
    
    Entity.prototype.toString = function() {
        
        return this.name;
    };
    
    function Player() {

        Entity.call(this, "you", 10, 0, 0, 0, 0);
        this.exp = 0;
        this.pointsToSpend = 0;
    }

    function Inventory() {
        
        this.items = [];
    }
    
    function Monster(name, lunge, leap, life, luck, lurk, expDrop, lootTable) {
        
        Entity.call(this, name, lunge, leap, life, luck, lurk);
        this.expDrop = expDrop;
        this.lootTable = lootTable;
    }
    
    util.inherit(Entity, Player);
    util.inherit(Entity, Monster);
    
    Player.prototype.getLevel = function() {
        
        return levels.getLevel(this.exp);
    };
    
    Player.prototype.addExp = function(exp) {
        
        this.exp += exp;
    };
    
    Player.prototype.levelUp = function() {
        
        this.pointsToSpend++;
    };
    
    Player.prototype.hasUnspentPoints = function(exp) {
        
        return this.pointsToSpend > 0;
    };
    
    Player.prototype.incrementStat = function(stat) {
        
        this[stat]++;
        this.pointsToSpend--;
        
        if(stat == "life") {
            
            this.hitpoints++;
        }
    };

    Monster.prototype.clone = function() {
        
        return new Monster(this.name, this.lunge, this.leap, this.life, this.lurk, this.expDrop, this.lootTable);
    };
    
    Monster.prototype.loot = function() {
        
        return this.lootTable.choose();
    };
    
    function getMonster(playerLevel) {
        
        var minLevel = playerLevel - PLAYER_MONSTER_LEVEL_VARIANCE - PLAYER_MONSTER_LEVEL_DISPARITY,
            maxLevel = playerLevel + PLAYER_MONSTER_LEVEL_VARIANCE - PLAYER_MONSTER_LEVEL_DISPARITY;
        
        var validMonsters = [];
        
        monsters.forEach(function(monster) {
            
            var realLevel = monster.getRealLevel();
            
            if(minLevel <= realLevel && realLevel <= maxLevel) {
                
                validMonsters.push(monster);
            }
        });
        
        return validMonsters[Math.floor(Math.random() * validMonsters.length)].clone();
    }
    
    var loot = util.newWeightedArray;
    var item = items.getItem;
    
    var monsters = [
        new Monster("giant rat", -2, -1, -5, 0, 0, 1, loot([
            [5, item("rusty dagger")],
            [2, item("bone dagger")],
            [2, item("cracked kris")]
        ])),
        new Monster("kobold", -1, 0, -3, 0, 0, 2, loot([
            [5, item("rusty dagger")],
            [2, item("bone dagger")],
            [2, item("cracked kris")]
        ])),
        new Monster("blood worm", 0, 1, -5, 0, -1, 2, loot([
            [5, item("rusty dagger")],
            [2, item("bone dagger")],
            [2, item("cracked kris")]
        ])),
        new Monster("giant spider", 2, 1, -4, 0, -3, 3, loot([
            [5, item("rusty dagger")],
            [2, item("bone dagger")],
            [2, item("cracked kris")]
        ])),
        new Monster("goblin", 0, 1, -2, 0, 0, 3, loot([
            [5, item("rusty dagger")],
            [2, item("bone dagger")],
            [2, item("cracked kris")]
        ])),
        new Monster("imp", 4, 1, -6, 0, -1, 3, loot([
            [5, item("rusty dagger")],
            [2, item("bone dagger")],
            [2, item("cracked kris")]
        ]))
    ];
    
    // public interface
    app.entities = {
        
        isValidStat: function(stat) {
            
            return STATS[stat] != undefined;
        },
        newPlayer: function() {
            
            return new Player();
        },
        getMonster: function(playerLevel) {
        
            return getMonster(playerLevel);
        }
    }
})();
