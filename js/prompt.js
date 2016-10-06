(function() {
    
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
        }
    };
    
    var history = prompt.history;
    
    prompt.focus();
    
    $(document).keyup(function(event) {

        prompt.focus();
    });
    
    // public interface
    app.prompt = {
        
        history: {
            
            push: function(text) {
                
                history.push(text);
            }
        },
        setText: function(text) {
            
            prompt.setText(text);
        },
        getText: function() {
            
            return prompt.getText();
        },
        previousCommand: function() {

            prompt.previousCommand();
        },
        nextCommand: function() {

            prompt.nextCommand();
        },
        clear: function() {
            
            prompt.clear();
        }
    };
})();
