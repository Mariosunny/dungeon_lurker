(function() {
    
    function WeightedArray() {
        
        this.array = [];
        this.sum = 0;
    }
    
    WeightedArray.prototype.push = function(weight, obj) {
        
        this.array.push({
            value: weight + this.sum, 
            obj: obj,
        });
        this.sum += weight;
    };
    
    WeightedArray.prototype.choose = function() {
        
        var value = app.util.randomInt(0, this.sum);
        var value1, value2;
        
        for(var i = 0; i < this.array.length; i++) {
            
            value1 = i == 0 ? 0:this.array[i-1].value;
            value2 = this.array[i].value;
            
            if(value1 <= value && value < value2) {
                
                return this.array[i].obj;
            }
        }
        
        return null;
    };

    app.util = {
        newWeightedArray: function(array) {
            
            var weightedArray = new WeightedArray();
            
            array.forEach(function(element) {
                
                weightedArray.push(element[0], element[1]);
            });
            
            return weightedArray;
        },
        inherit: function(proto, obj) {

            obj.prototype = Object.create(proto.prototype);
            obj.prototype.constructor = obj;
        },
        randomInt: function(min, max) {

            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    };
    
    String.prototype.replaceAll = function(regex, replacement) {
        
        var target = this;
        
        return target.replace(new RegExp(regex, 'g'), replacement);
    };
})();