(function() {
    
    function Message(text, isOutput, delay) {
        
        this.row = _.template(screen.screenRowTemplate.html())({
            text: text,
            type: isOutput ? "output": "input"
        });
        this.delay = delay;
    }
    
    var screen = {
        DISPLAY_HEIGHT: 40,
        element: $('#screen'),
        screenRowTemplate: $('#template-screen-row'),
        queue: [],
        isPrinting: false,
        hasMessages: function() {
          
            return this.queue.length > 0;
        },
        input: function(text, delay) {

            this.push("> " + text, false, delay);
        },
        output: function(text, delay) {

            this.push(text, true, delay);
        },
        push: function(text, isOutput, delay) {
            
            text = text.replaceAll(" ", "&nbsp;")
            
            this.queue.push(new Message(text, isOutput, delay));
        },
        displayMessage: function(){

            if(screen.hasMessages() && !screen.isPrinting) {
            
                var message = screen.queue.shift();
                screen.isPrinting = true;

                setTimeout(function() { 

                    screen.element.children()[0].remove();
                    screen.element.append(message.row);
                    screen.isPrinting = false;
                }, message.delay);
            }
        }
    };
    
    setInterval(screen.displayMessage, 10);
    
    var row = _.template(screen.screenRowTemplate.html())({
        text: "",
        type: "output"
    });

    for(var i = 0; i < screen.DISPLAY_HEIGHT; i++) {

        screen.element.append(row);
    }
    
    // public interface
    app.screen = {
        
        isPrinting: function() {
            
            return screen.isPrinting;
        },
        input: function(text, delay) {
            
            screen.input(text || "", delay || 0);
        },
        output: function(text, delay) {
            
            screen.output(text || "", delay || 0);
        }
    };
})();