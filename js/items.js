(function() {
    
    var util = app.util,
        dice = app.dice;

    function Item(name) {

        this.name = name;
    }

    Item.prototype.toString = function() {
        
        return this.name;
    }
    
    function Object(name, armor) {

        Item.call(this, name);

        this.armor = armor;
    }

    function Weapon(name, dice) {

        Item.call(this, name);
        
        this.dice = dice;
    }
    
    util.inherit(Item, Object);
    util.inherit(Item, Weapon);
    
    Weapon.prototype.roll = function() {

        var roll = this.dice.roll();
        
        return roll >= 0 ? roll:0;
    };
    
    Weapon.prototype.clone = function() {

        return new Weapon(this.name, this.dice);
    };
    
    var newDice = dice.newDice;

    var weapons = [
        new Weapon("rusty dagger", newDice([4], -1)),
        new Weapon("bronze dagger", newDice([4], 0)),
        new Weapon("bone dagger", newDice([4, 4], -2)),
        new Weapon("rusty sword", newDice([4], 1)),
        new Weapon("cracked kris", newDice([10], -2)),
        new Weapon("foul-smelling bag", newDice([6], 0)),
        new Weapon("iron scimitar", newDice([6], 1)),
        new Weapon("polished fang", newDice([4, 4], 0)),
        new Weapon("sharpened hatchet", newDice([4, 6], -1)),
        new Weapon("crude bludgeon", newDice([6], 2)),
        new Weapon("primal dagger", newDice([10], 0)),
        new Weapon("steel mace", newDice([4, 4], 1)),
        new Weapon("silver cutlass", newDice([4, 6], 0)),
        new Weapon("smoke bomb", newDice([4, 8], -1)),
        new Weapon("fire sabre", newDice([12], 0)),
        new Weapon("brass knuckles", newDice([10], 1)),
        new Weapon("rod of finding", newDice([4], 4)),
        new Weapon("bastard flail", newDice([4, 8], 0)),
        new Weapon("poison dart", newDice([4, 4], 2)),
        new Weapon("oak wand", newDice([12], 1)),
        new Weapon("butcher knife", newDice([4, 6], 2)),
        new Weapon("glyphic dirk", newDice([6, 8], 0)),
        new Weapon("glyphic dirk (enchanted)", newDice([4, 4, 4], 1)),
        new Weapon("cursed ranseur", newDice([4, 4, 8], -1)),
        new Weapon("shash of choking", newDice([8, 12], -3)),
        new Weapon("elven long bow", newDice([6, 12], 0)),
        new Weapon("flash powder", newDice([4, 10], 1)),
        new Weapon("orichalcum ballista", newDice([8, 8], 1)),
        new Weapon("zweihander of felling", newDice([4, 6], 4)),
        new Weapon("seething chakrams", newDice([4, 4, 12], -1)),
        new Weapon("minotaur horn", newDice([4, 4, 10], 0)),
        new Weapon("maple wand", newDice([6, 6, 6], 0)),
        new Weapon("flaming wrench", newDice([4, 4, 4, 4], 1)),
        new Weapon("emerald sword", newDice([10, 12], -1)),
        new Weapon("infinity blade", newDice([8, 20], -4)),
        new Weapon("jewel-encrusted skull", newDice([6, 6, 8], 0)),
        new Weapon("adamantite blade staff", newDice([20], 0)),
        new Weapon("bloodstained sceptre", newDice([4, 4, 4, 6], 1)),
        new Weapon("clay golem", newDice([4, 6, 12], 0)),
        new Weapon("giant anchor", newDice([4, 4, 10], 2)),
        new Weapon("centaur bow", newDice([4, 10, 10], -1)),
        new Weapon("rune pouch", newDice([4, 4, 6], 4)),
        new Weapon("golden scythe", newDice([4, 20], 0)),
        new Weapon("basalt sword", newDice([6, 20], -1)),
        new Weapon("bottle of acid", newDice([8, 10], 4)),
        new Weapon("gossamer stiletto", newDice([6, 6, 6, 6], 0)),
        new Weapon("elinvar spear", newDice([4, 4, 6, 6], 2)),
        new Weapon("kinslayer crossbow", newDice([4, 4, 20], -1)),
        new Weapon("supreme magma blade", newDice([6, 6, 8], 3)),
        new Weapon("mahogany wand", newDice([4, 4, 4, 4, 4, 4], 0)),
        new Weapon("magic scroll (lightning)", newDice([8, 20], 0)),
        new Weapon("maddening morning star", newDice([12, 12], 2)),
        new Weapon("potion of strength", newDice([6, 10], 6)),
        new Weapon("redsteel cutlass", newDice([6, 10, 12], 0)),
        new Weapon("aberrant fetish", newDice([4, 4, 6, 6, 8], -1)),
        new Weapon("war axe of reckoning", newDice([4, 10, 20], -3)),
        new Weapon("suspended dagger", newDice([4, 4, 8, 10], 1)),
        new Weapon("diamond-tipped katar", newDice([4, 4, 8, 8], 2)),
        new Weapon("greatsword of heart", newDice([4, 6, 8, 10], 0)),
        new Weapon("magic scroll (meteor strike)", newDice([6, 6, 6, 8], 1)),
        new Weapon("seven-branched sword", newDice([4, 4, 10], 6)),
        new Weapon("glass katana", newDice([6, 12, 12], 0)),
        new Weapon("meteorite greathammer", newDice([12], 10)),
        new Weapon("magnificent j", newDice([8, 8, 10], 2)),
        new Weapon("sovereign demon heart", newDice([8, 8, 8, 12], -3)),
        new Weapon("immovable wand", newDice([12, 20], 0)),
        new Weapon("aureate scimitar", newDice([4, 4, 4, 4, 4, 6], 1)),
        new Weapon("lord master trident", newDice([4, 4, 12], 6)),
        new Weapon("ioun stone", newDice([8, 8, 8, 8], 0)),
        new Weapon("big dragon dawn", newDice([4, 6], 12)),
        new Weapon("mithril sword", newDice([4, 10, 20], 0)),
        new Weapon("gale valley broadsword", newDice([10, 20], 4)),
    ];
    
    weaponsByName = (function() {
        
        var dict = {};
        
        weapons.forEach(function(weapon) {
            
            dict[weapon.name] = weapon;
        });
        
        return dict;
    })();
    
    function getItem(name) {
        
        return weaponsByName[name].clone();
    }

    // public interface
    app.items = {
        getItem: function(name) {
            
            return getItem(name);
        },
        getStartingItem: function() {
            
            return getItem("rusty dagger");
        }
    };
})();
